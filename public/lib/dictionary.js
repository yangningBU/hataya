// Offline dictionary: builds a search index over every form of every word in
// the lexicon (all conjugated verb forms, plurals, adjective forms) so that
// any inflected form leads back to its dictionary entry.

import { toPlain, searchKey, looseKey, isHebrew, stripNikkud } from './hebrew.js';
import { makeExample } from './sentence.js';
import { EXAMPLES_TSV } from './examples.js';
import { conjugate, gizraOf, parseRoot, BINYANIM, SLOTS } from './conjugate.js';
import { NOUNS, ADJECTIVES, VERBS } from './lexicon.js';

const PREFIXES = ['ו', 'ה', 'ב', 'ל', 'מ', 'ש', 'כ'];

const withPlain = (f) => (f ? { n: f.n.normalize('NFC'), p: f.p || toPlain(f.n) } : null);

const EXAMPLES = new Map(
  EXAMPLES_TSV.trim().split('\n').filter((l) => l.trim()).map((l) => {
    const [key, he, en] = l.split('|');
    return [key, makeExample(he, en)];
  }),
);

export function exampleKeyOf(entry) {
  if (entry.type === 'noun') return [`n:${entry.lemma.p}/${entry.gender}`, `n:${entry.lemma.p}`];
  if (entry.type === 'adjective') return [`a:${entry.forms.ms.p}`];
  return [`v:${stripNikkud(entry.rootSpec)}:${entry.binyan}`];
}
const exampleFor = (entry) => exampleKeyOf(entry).map((k) => EXAMPLES.get(k)).find(Boolean) || null;

function buildEntries() {
  const entries = [];
  for (const n of NOUNS) {
    entries.push({ ...n, lemma: withPlain(n.lemma), plural: withPlain(n.plural), source: 'local' });
  }
  for (const a of ADJECTIVES) {
    const forms = Object.fromEntries(Object.entries(a.forms).map(([k, f]) => [k, withPlain(f)]));
    entries.push({ ...a, forms, lemma: forms.ms, source: 'local' });
  }
  for (const v of VERBS) {
    const entry = { root: v.r, binyan: v.b, ...v };
    const conj = conjugate(entry);
    const lemma = v.lemma ? withPlain({ n: v.lemma }) : conj.infinitive || conj.past['3ms'];
    entries.push({
      type: 'verb',
      lemma,
      root: [...parseRoot(v.r)].map((x) => x.l).join(''),
      rootSpec: v.r,
      binyan: v.b,
      gizra: v.irregular ? 'irregular' : gizraOf(entry),
      gloss: v.g,
      note: v.note || null,
      conj,
      source: 'local',
    });
  }
  entries.forEach((e, i) => {
    e.id = `local-${i}`;
    const ex = exampleFor(e);
    // Use the entry's own plain spelling for the highlighted word when it is one of its forms.
    const own = ex && formsOf(e).find(({ form }) => form.n === ex.n.word);
    e.example = own ? { ...ex, p: { ...ex.p, word: own.form.p } } : ex;
  });
  return entries;
}

/** Every searchable form of an entry: [{ form: {n,p}, where }] */
export function formsOf(entry) {
  const out = [];
  if (entry.type === 'noun') {
    out.push({ form: entry.lemma, where: { kind: 'singular' } });
    if (entry.plural) out.push({ form: entry.plural, where: { kind: 'plural' } });
  } else if (entry.type === 'adjective') {
    for (const k of ['ms', 'fs', 'mp', 'fp']) if (entry.forms[k]) out.push({ form: entry.forms[k], where: { kind: k } });
  } else if (entry.type === 'verb' && entry.conj) {
    for (const tense of Object.keys(SLOTS)) {
      const t = entry.conj[tense];
      if (!t) continue;
      for (const slot of SLOTS[tense]) if (t[slot]) out.push({ form: t[slot], where: { kind: 'verb', tense, slot } });
    }
    if (entry.conj.infinitive) out.push({ form: entry.conj.infinitive, where: { kind: 'verb', tense: 'infinitive' } });
  }
  return out;
}

let state = null;

function addTo(map, key, hit) {
  if (!key) return;
  let list = map.get(key);
  if (!list) map.set(key, (list = []));
  if (!list.some((h) => h.entry === hit.entry && sameWhere(h.where, hit.where))) list.push(hit);
}
const sameWhere = (a, b) => a.kind === b.kind && a.tense === b.tense && a.slot === b.slot;

function build() {
  const entries = buildEntries();
  const exact = new Map();
  const loose = new Map();
  for (const entry of entries) {
    for (const { form, where } of formsOf(entry)) {
      for (const spelling of [form.n, form.p]) {
        addTo(exact, searchKey(spelling), { entry, where });
        addTo(loose, looseKey(spelling), { entry, where });
      }
    }
  }
  state = { entries, exact, loose };
  return state;
}

const getState = () => state || build();

function group(hits, extra = {}) {
  const byEntry = new Map();
  for (const h of hits) {
    if (!byEntry.has(h.entry)) byEntry.set(h.entry, { entry: h.entry, matches: [], ...extra });
    byEntry.get(h.entry).matches.push(h.where);
  }
  // Prefer entries where the query is the dictionary form itself.
  const isLemma = (r) => r.matches.some((w) => ['singular', 'ms'].includes(w.kind) || w.tense === 'infinitive');
  return [...byEntry.values()].sort((a, b) => isLemma(b) - isLemma(a));
}

function lookupEnglish(q) {
  const needle = q.toLowerCase().replace(/^to\s+/, '').trim();
  if (needle.length < 2) return [];
  const scored = [];
  for (const entry of getState().entries) {
    const phrases = entry.gloss.toLowerCase().split(/[,;]/).map((s) => s.replace(/\(.*?\)/g, '').replace(/^\s*to\s+/, '').trim());
    let score = 0;
    if (phrases.includes(needle)) score = 3;
    else if (phrases.some((p) => p.split(/\s+/).includes(needle))) score = 2;
    else if (phrases.some((p) => p.startsWith(needle))) score = 1;
    if (score) scored.push({ entry, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 12)
    .map(({ entry }) => ({ entry, matches: [{ kind: 'english' }] }));
}

/**
 * Look a word up in the offline dictionary.
 * Returns { results: [{ entry, matches: [where], prefix? , approximate? }] }
 */
export function lookup(query) {
  const q = (query || '').trim();
  if (!q) return { results: [] };
  if (!isHebrew(q)) return { results: lookupEnglish(q), english: true };

  const { exact, loose } = getState();
  const key = searchKey(q);
  if (!key) return { results: [] };

  if (exact.has(key)) return { results: group(exact.get(key)) };

  // Try stripping attached prefixes (ו, ה, ב, ל, מ, ש, כ — up to two of them).
  for (let n = 1; n <= 2; n++) {
    const head = key.slice(0, n);
    const rest = key.slice(n);
    if (rest.length < 2 || ![...head].every((c) => PREFIXES.includes(c))) continue;
    if (exact.has(rest)) return { results: group(exact.get(rest), { prefix: head }) };
  }

  // Spelling variations (with or without ו/י as vowel letters).
  const lk = looseKey(q);
  if (loose.has(lk)) return { results: group(loose.get(lk), { approximate: true }) };

  return { results: [] };
}

export function allEntries() {
  return getState().entries;
}

export { BINYANIM };

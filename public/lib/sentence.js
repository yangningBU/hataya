// Example sentences: parsing the {highlighted} word and producing the plain
// (no nikkud) version of a whole sentence.

import { toPlain, stripNikkud, searchKey } from './hebrew.js';

const BOUNDARY = /·/g;

// Common words whose standard plain spelling keeps a "defective" vowel.
const KEEP_DEFECTIVE = new Set(['לא', 'פה', 'איפה', 'כה', 'מדי']);

/** Plain spelling for running text, word by word. */
export function plainText(s) {
  return s.split(/(\s+)/).map((tok) => {
    if (!tok || /^\s+$/.test(tok)) return tok;
    const bare = stripNikkud(tok).replace(BOUNDARY, '').replace(/[^א-ת]/g, '');
    if (KEEP_DEFECTIVE.has(bare)) return stripNikkud(tok).replace(BOUNDARY, '');
    return toPlain(tok).replace(BOUNDARY, '');
  }).join('');
}

/** Split "before {word} after" into parts; null if there is no single braced word. */
export function splitBraced(s) {
  const m = /^([^{}]*)\{([^{}]+)\}([^{}]*)$/s.exec((s || '').trim());
  return m ? { before: m[1], word: m[2], after: m[3] } : null;
}

const clean = (parts) => ({
  before: parts.before.replace(BOUNDARY, ''),
  word: parts.word.replace(BOUNDARY, ''),
  after: parts.after.replace(BOUNDARY, ''),
});

/**
 * Build an example from a vowelled sentence with one {word}.
 * Returns { n: parts, p: parts, en, key } or null.
 */
export function makeExample(nikkud, english, plain) {
  const parts = splitBraced(nikkud?.normalize('NFC'));
  if (!parts) return null;
  const plainParts = (plain && splitBraced(plain)) || {
    before: plainText(parts.before),
    word: plainText(parts.word),
    after: plainText(parts.after),
  };
  return { n: clean(parts), p: clean(plainParts), en: english, key: searchKey(parts.word) };
}

const PREFIX_LETTERS = 'והבלמשכ';

/** Search keys a word could have once attached prefixes (up to two) are removed. */
export function keyVariants(key) {
  const out = [key];
  for (let n = 1; n <= 2 && key.length - n >= 2; n++) {
    if ([...key.slice(0, n)].every((c) => PREFIX_LETTERS.includes(c))) out.push(key.slice(n));
  }
  return out;
}

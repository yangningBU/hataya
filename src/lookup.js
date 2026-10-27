// POST /api/lookup { word }
// Asks Claude for a structured analysis of a Hebrew word the offline
// dictionary doesn't know. Responses are cached at the edge per word.

import { json, cleanWord, readJson, cachedJson, askClaude, EXAMPLE_SCHEMA, validExample } from './shared.js';

const CACHE_VERSION = 'v3';

const form = {
  type: 'object',
  additionalProperties: false,
  required: ['n', 'p'],
  properties: {
    n: { type: 'string', description: 'Fully vowelled form (with nikkud).' },
    p: { type: 'string', description: 'Modern plain spelling without nikkud (ktiv male).' },
  },
};
const nullable = (schema) => ({ anyOf: [schema, { type: 'null' }] });
const slots = (keys) => ({
  type: 'object',
  additionalProperties: false,
  required: keys,
  properties: Object.fromEntries(keys.map((k) => [k, nullable(form)])),
});

const PAST = ['1s', '2ms', '2fs', '3ms', '3fs', '1p', '2mp', '2fp', '3p'];
const PRESENT = ['ms', 'fs', 'mp', 'fp'];
const FUTURE = ['1s', '2ms', '2fs', '3ms', '3fs', '1p', '2mp', '2fp', '3mp', '3fp'];

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['entries'],
  properties: {
    entries: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'lemma', 'gloss', 'note', 'matched_form', 'gender', 'plural', 'adjective_forms', 'verb', 'example'],
        properties: {
          type: { type: 'string', enum: ['noun', 'verb', 'adjective', 'other'] },
          lemma: form,
          gloss: { type: 'string', description: 'Short English meaning.' },
          note: { type: 'string', description: 'One short learner-friendly remark (irregularities, usage), or empty.' },
          matched_form: nullable({ type: 'string', description: 'Which form the input was, in English, e.g. "past, 1st person singular".' }),
          gender: nullable({ type: 'string', enum: ['m', 'f', 'mf'] }),
          plural: nullable(form),
          adjective_forms: nullable(slots(PRESENT)),
          verb: nullable({
            type: 'object',
            additionalProperties: false,
            required: ['root', 'binyan', 'past', 'present', 'future', 'imperative', 'infinitive'],
            properties: {
              root: { type: 'string', description: 'Root letters without separators, e.g. כתב.' },
              binyan: { type: 'string', enum: ['paal', 'nifal', 'piel', 'pual', 'hifil', 'hufal', 'hitpael'] },
              past: slots(PAST),
              present: nullable(slots(PRESENT)),
              future: slots(FUTURE),
              imperative: nullable(slots(PRESENT)),
              infinitive: nullable(form),
            },
          }),
          example: nullable(EXAMPLE_SCHEMA),
        },
      },
    },
  },
};

const SYSTEM = `You are a meticulous Hebrew grammarian helping learners of Modern Hebrew.
The user sends one word: Hebrew (any inflected form, with or without nikkud, possibly with attached prefixes like ה/ו/ב/ל) or an English word to translate.
Identify the dictionary word(s) it can be — up to 3, most likely first — and describe each:
- noun: grammatical gender (m, f, or mf if both are used), the singular as lemma, and the plural (null if it has none). For nouns that exist only in the plural (מַיִם, מִכְנָסַיִם, אוֹפַנַּיִם), set both lemma and plural to that plural form, and say so in note. Never give an archaic or differently-meaning word as the singular.
- adjective: lemma = masculine singular; adjective_forms = ms, fs, mp, fp.
- verb: lemma = infinitive (or 3rd person masculine singular past if there is no infinitive); root letters; binyan; every form of past (9), present (ms, fs, mp, fp), future (10; for 2fp/3fp give the formal -נָה form when one exists), imperative (null if the verb has none) and infinitive. Use null for a single form that does not exist.
- other: for words that are none of these (prepositions, names...), give lemma, gloss and a note only.
For every form, n is the standard vocalization with full nikkud, and p is the modern plain spelling following the Academy of the Hebrew Language ktiv male rules.
Fields that do not apply to the entry's type must be null. Keep gloss and note short. matched_form says which form the input word is (null for English input).
example: one short, natural sentence (4–10 words, everyday vocabulary) that uses the exact form the user typed — or the lemma, for English input — with that word, including any attached prefixes, wrapped in {curly braces}; give it with full nikkud, in plain spelling, and in English.`;

export async function handleLookup(request, env, ctx) {
  if (request.method !== 'POST') return json({ error: 'Use POST.' }, 405, { allow: 'POST' });
  const body = await readJson(request);
  if (!body) return json({ error: 'Send JSON: { "word": "..." }' }, 400);
  const word = cleanWord(body.word);
  if (!word) return json({ error: 'Please enter a single Hebrew (or English) word.' }, 400);
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'The AI lookup is not configured on this server.' }, 503);

  return cachedJson(request, ctx, `/api/lookup/${CACHE_VERSION}/${encodeURIComponent(word)}`, async () => {
    const { data, model, error } = await askClaude(env, {
      system: SYSTEM, user: word, schema: SCHEMA, effort: 'medium', maxTokens: 16000,
    });
    if (error) return error;
    const entries = (data.entries || []).map((e) => ({ ...e, example: validExample(e.example) ? e.example : null }));
    return json({ word, entries, model });
  });
}

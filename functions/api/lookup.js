// Cloudflare Pages Function: POST /api/lookup { word }
// Asks Claude for a structured analysis of a Hebrew word the offline
// dictionary doesn't know. Responses are cached at the edge per word.

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-5-5';
const CACHE_VERSION = 'v1';
const MAX_WORD_LENGTH = 40;

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
        required: ['type', 'lemma', 'gloss', 'note', 'matched_form', 'gender', 'plural', 'adjective_forms', 'verb'],
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
        },
      },
    },
  },
};

const SYSTEM = `You are a meticulous Hebrew grammarian helping learners of Modern Hebrew.
The user sends one word: Hebrew (any inflected form, with or without nikkud, possibly with attached prefixes like ה/ו/ב/ל) or an English word to translate.
Identify the dictionary word(s) it can be — up to 3, most likely first — and describe each:
- noun: grammatical gender (m, f, or mf if both are used), the singular as lemma, and the plural (null if it has none).
- adjective: lemma = masculine singular; adjective_forms = ms, fs, mp, fp.
- verb: lemma = infinitive (or 3rd person masculine singular past if there is no infinitive); root letters; binyan; every form of past (9), present (ms, fs, mp, fp), future (10; for 2fp/3fp give the formal -נָה form when one exists), imperative (null if the verb has none) and infinitive. Use null for a single form that does not exist.
- other: for words that are none of these (prepositions, names...), give lemma, gloss and a note only.
For every form, n is the standard vocalization with full nikkud, and p is the modern plain spelling following the Academy of the Hebrew Language ktiv male rules.
Fields that do not apply to the entry's type must be null. Keep gloss and note short. matched_form says which form the input word is (null for English input).`;

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });

const normalize = (w) => w.normalize('NFC').trim().replace(/\s+/g, ' ');

export async function onRequestPost({ request, env, waitUntil }) {
  let word;
  try {
    ({ word } = await request.json());
  } catch {
    return json({ error: 'Send JSON: { "word": "..." }' }, 400);
  }
  if (typeof word !== 'string') return json({ error: 'Missing word.' }, 400);
  word = normalize(word);
  if (!word || word.length > MAX_WORD_LENGTH || !/^[֐-׿a-zA-Z'"׳״ -]+$/.test(word)) {
    return json({ error: 'Please enter a single Hebrew (or English) word.' }, 400);
  }
  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: 'The AI lookup is not configured on this server.' }, 503);
  }

  const cache = caches.default;
  const cacheKey = new Request(new URL(`/api/lookup/${CACHE_VERSION}/${encodeURIComponent(word)}`, request.url));
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  let message;
  try {
    message = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: SCHEMA },
      },
      messages: [{ role: 'user', content: word }],
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return json({ error: 'Too many requests right now — try again in a minute.' }, 429);
    if (err instanceof Anthropic.APIConnectionError) return json({ error: 'Could not reach the AI service.' }, 502);
    if (err instanceof Anthropic.APIError) return json({ error: 'The AI service returned an error.' }, 502);
    throw err;
  }

  if (message.stop_reason === 'refusal') return json({ error: 'The AI could not answer this one.' }, 422);
  if (message.stop_reason === 'max_tokens') return json({ error: 'The answer was too long — try a more specific form of the word.' }, 502);
  const text = message.content.find((b) => b.type === 'text')?.text;
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return json({ error: 'The AI returned an unreadable answer.' }, 502);
  }

  const response = json({ word, entries: data.entries, model: message.model }, 200, {
    'cache-control': 'public, max-age=2592000',
  });
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

export function onRequest() {
  return json({ error: 'Use POST.' }, 405, { allow: 'POST' });
}

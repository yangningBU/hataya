// POST /api/example { word, lemma, type, gloss, form }
// Asks Claude for one example sentence that uses exactly the form the user
// typed. Used when the built-in example shows a different form of the word.

import { json, cleanWord, readJson, cachedJson, askClaude, EXAMPLE_SCHEMA, validExample } from './shared.js';
import { searchKey } from '../public/lib/hebrew.js';
import { keyVariants } from '../public/lib/sentence.js';

const CACHE_VERSION = 'v1';
const TYPES = ['noun', 'verb', 'adjective', 'other'];

const SYSTEM = `You write example sentences for learners of Modern Hebrew.
Write one short, natural sentence (4–10 words, everyday vocabulary) that uses the exact word form the user gives, unchanged.
Wrap that word — including any prefixes attached to it — in {curly braces}, exactly once.
Give the sentence with full, correct nikkud; the same sentence in plain spelling following the Academy of the Hebrew Language ktiv male rules; and a natural English translation.`;

const short = (s, max) => (typeof s === 'string' ? s.replace(/[\r\n{}]/g, ' ').trim().slice(0, max) : '');

export async function handleExample(request, env, ctx) {
  if (request.method !== 'POST') return json({ error: 'Use POST.' }, 405, { allow: 'POST' });
  const body = await readJson(request);
  if (!body) return json({ error: 'Send JSON: { "word": "..." }' }, 400);
  const word = cleanWord(body.word);
  if (!word || !/[א-ת]/.test(word)) return json({ error: 'Please send a Hebrew word.' }, 400);
  const type = TYPES.includes(body.type) ? body.type : 'other';
  const lemma = short(body.lemma, 40);
  const gloss = short(body.gloss, 80);
  const form = short(body.form, 60);
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'The AI lookup is not configured on this server.' }, 503);

  const about = [
    `Word form: ${word}`,
    lemma && `Dictionary form: ${lemma} (${type})`,
    gloss && `Meaning: ${gloss}`,
    form && `This form is: ${form}`,
  ].filter(Boolean).join('\n');

  const path = `/api/example/${CACHE_VERSION}/${encodeURIComponent(`${word}|${searchKey(lemma)}|${type}`)}`;
  return cachedJson(request, ctx, path, async () => {
    const { data, error } = await askClaude(env, {
      system: SYSTEM, user: about, schema: EXAMPLE_SCHEMA, effort: 'low', maxTokens: 4000,
    });
    if (error) return error;
    // The braced word must be the form that was asked for (prefixes allowed).
    const braced = /\{([^{}]+)\}/.exec(data?.plain || '')?.[1] || '';
    const wanted = keyVariants(searchKey(word));
    if (!validExample(data) || !keyVariants(searchKey(braced)).some((k) => wanted.includes(k))) {
      return json({ error: 'The AI did not return a usable example.' }, 502);
    }
    return json({ word, example: data });
  });
}

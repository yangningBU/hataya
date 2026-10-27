// Helpers shared by the API handlers: responses, input checks, edge caching
// and the structured Claude call.

import Anthropic from '@anthropic-ai/sdk';

export const MODEL = 'claude-opus-5-5';
export const MAX_WORD_LENGTH = 40;
const WORD_RE = /^[֐-׿a-zA-Z'"׳״ -]+$/;

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });

export const normalize = (w) => w.normalize('NFC').trim().replace(/\s+/g, ' ');

/** A single Hebrew (or English) word or short phrase, normalized; null if invalid. */
export function cleanWord(word) {
  if (typeof word !== 'string') return null;
  const w = normalize(word);
  return w && w.length <= MAX_WORD_LENGTH && WORD_RE.test(w) ? w : null;
}

/** Parse a JSON request body; null if it isn't a JSON object. */
export async function readJson(request) {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : null;
  } catch {
    return null;
  }
}

/** An example sentence, as the model returns it: the example word wrapped in {braces}. */
export const EXAMPLE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['nikkud', 'plain', 'english'],
  properties: {
    nikkud: { type: 'string', description: 'The Hebrew sentence with full nikkud, the example word wrapped in {curly braces}.' },
    plain: { type: 'string', description: 'The same sentence in plain spelling (ktiv male), the same word wrapped in {curly braces}.' },
    english: { type: 'string', description: 'A natural English translation.' },
  },
};

const ONE_BRACED = /^[^{}]*\{[^{}]+\}[^{}]*$/;
export const validExample = (ex) =>
  !!ex && ONE_BRACED.test(ex.nikkud || '') && ONE_BRACED.test(ex.plain || '') && !!ex.english;

/** Look up a cached response for this key, or build, cache and return a new one. */
export async function cachedJson(request, ctx, path, build) {
  const cache = caches.default;
  const key = new Request(new URL(path, request.url));
  const hit = await cache.match(key);
  if (hit) return hit;
  const response = await build();
  if (response.ok) {
    response.headers.set('cache-control', 'public, max-age=2592000');
    ctx.waitUntil(cache.put(key, response.clone()));
  }
  return response;
}

/**
 * Ask Claude for JSON matching `schema`. Returns { data } or { error: Response }.
 */
export async function askClaude(env, { system, user, schema, effort, maxTokens }) {
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  let message;
  try {
    message = await client.beta.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system,
      output_config: { effort, format: { type: 'json_schema', schema } },
      messages: [{ role: 'user', content: user }],
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return { error: json({ error: 'Too many requests right now — try again in a minute.' }, 429) };
    if (err instanceof Anthropic.APIConnectionError) return { error: json({ error: 'Could not reach the AI service.' }, 502) };
    if (err instanceof Anthropic.APIError) return { error: json({ error: 'The AI service returned an error.' }, 502) };
    throw err;
  }
  if (message.stop_reason === 'refusal') return { error: json({ error: 'The AI could not answer this one.' }, 422) };
  if (message.stop_reason === 'max_tokens') return { error: json({ error: 'The AI answer was cut off — try again.' }, 502) };
  const text = message.content.find((b) => b.type === 'text')?.text;
  try {
    return { data: JSON.parse(text), model: message.model };
  } catch {
    return { error: json({ error: 'The AI returned an unreadable answer.' }, 502) };
  }
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';

const ctx = { waitUntil: () => {} };
const env = { ASSETS: { fetch: () => new Response('asset') } };
const call = (method, body, extraEnv = {}) =>
  worker.fetch(
    new Request('https://hataya.test/api/lookup', {
      method,
      body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
    }),
    { ...env, ...extraEnv },
    ctx,
  );

test('rejects bad input', async () => {
  assert.equal((await call('POST', 'not json')).status, 400);
  assert.equal((await call('POST', {})).status, 400);
  assert.equal((await call('POST', { word: '<script>' })).status, 400);
  assert.equal((await call('POST', { word: 'א'.repeat(50) })).status, 400);
});

test('reports a missing API key clearly', async () => {
  const res = await call('POST', { word: 'קרנף' });
  assert.equal(res.status, 503);
  assert.match((await res.json()).error, /not configured/);
});

test('only POST is allowed', async () => {
  assert.equal((await call('GET')).status, 405);
});

test('other requests fall through to static assets', async () => {
  const res = await worker.fetch(new Request('https://hataya.test/index.html'), env, ctx);
  assert.equal(await res.text(), 'asset');
  assert.equal((await worker.fetch(new Request('https://hataya.test/api/nope'), env, ctx)).status, 404);
});

const callExample = (body) =>
  worker.fetch(new Request('https://hataya.test/api/example', { method: 'POST', body: JSON.stringify(body) }), env, ctx);

test('example endpoint validates input', async () => {
  assert.equal((await callExample({})).status, 400);
  assert.equal((await callExample({ word: 'hello' })).status, 400);
  const res = await callExample({ word: 'הלכתי', lemma: 'לָלֶכֶת', type: 'verb' });
  assert.equal(res.status, 503);
});

// ---- full request path against a fake Anthropic API

function withFakeClaude(reply, fn) {
  return async () => {
    const realFetch = globalThis.fetch;
    const realCaches = globalThis.caches;
    const sent = [];
    globalThis.caches = { default: { match: async () => undefined, put: async () => {} } };
    globalThis.fetch = async (input, init) => {
      const req = new Request(input, init);
      sent.push({ url: req.url, headers: req.headers, body: await req.json() });
      return new Response(JSON.stringify({
        id: 'msg_test', type: 'message', role: 'assistant', model: 'claude-opus-5-5',
        content: [{ type: 'text', text: JSON.stringify(reply) }],
        stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 },
      }), { status: 200, headers: { 'content-type': 'application/json' } });
    };
    try {
      await fn(sent);
    } finally {
      globalThis.fetch = realFetch;
      globalThis.caches = realCaches;
    }
  };
}

const keyEnv = { ...env, ANTHROPIC_API_KEY: 'sk-ant-test' };

test('example endpoint returns a checked example', withFakeClaude(
  { nikkud: 'אֶתְמוֹל {הָלַכְתִּי} לַ·יָּם.', plain: 'אתמול {הלכתי} לים.', english: 'Yesterday I went to the beach.' },
  async (sent) => {
    const res = await worker.fetch(new Request('https://hataya.test/api/example', {
      method: 'POST', body: JSON.stringify({ word: 'הלכתי', lemma: 'לָלֶכֶת', type: 'verb', gloss: 'to go', form: 'past, I' }),
    }), keyEnv, ctx);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).example.english, 'Yesterday I went to the beach.');
    const { url, headers, body } = sent[0];
    assert.match(url, /\/v1\/messages/);
    assert.match(headers.get('anthropic-beta'), /server-side-fallback-2026-07-01/);
    assert.equal(body.model, 'claude-opus-5-5');
    assert.equal(body.fallbacks, 'default');
    assert.equal(body.output_config.format.type, 'json_schema');
    assert.match(body.messages[0].content, /הלכתי/);
  },
));

test('example endpoint rejects an example that uses a different word', withFakeClaude(
  { nikkud: 'אֲנִי {הוֹלֵךְ} לַ·יָּם.', plain: 'אני {הולך} לים.', english: 'I go to the beach.' },
  async () => {
    const res = await worker.fetch(new Request('https://hataya.test/api/example', {
      method: 'POST', body: JSON.stringify({ word: 'הלכתי', type: 'verb' }),
    }), keyEnv, ctx);
    assert.equal(res.status, 502);
  },
));

test('lookup returns entries and drops malformed examples', withFakeClaude(
  { entries: [{ type: 'noun', lemma: { n: 'קַרְנַף', p: 'קרנף' }, gloss: 'rhinoceros', note: '', matched_form: 'singular', gender: 'm', plural: null, adjective_forms: null, verb: null, example: { nikkud: 'no braces', plain: 'x', english: 'y' } }] },
  async (sent) => {
    const res = await worker.fetch(new Request('https://hataya.test/api/lookup', { method: 'POST', body: JSON.stringify({ word: 'קרנף' }) }), keyEnv, ctx);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.entries[0].gloss, 'rhinoceros');
    assert.equal(data.entries[0].example, null);
    assert.ok(sent[0].body.output_config.format.schema.properties.entries.items.required.includes('example'));
  },
));

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

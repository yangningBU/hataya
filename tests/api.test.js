import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost, onRequest } from '../functions/api/lookup.js';

const post = (body, env = {}) =>
  onRequestPost({
    request: new Request('https://hataya.test/api/lookup', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) }),
    env,
    waitUntil: () => {},
  });

test('rejects bad input', async () => {
  assert.equal((await post('not json')).status, 400);
  assert.equal((await post({})).status, 400);
  assert.equal((await post({ word: '<script>' })).status, 400);
  assert.equal((await post({ word: 'א'.repeat(50) })).status, 400);
});

test('reports a missing API key clearly', async () => {
  const res = await post({ word: 'קרנף' });
  assert.equal(res.status, 503);
  assert.match((await res.json()).error, /not configured/);
});

test('only POST is allowed', async () => {
  assert.equal(onRequest().status, 405);
});

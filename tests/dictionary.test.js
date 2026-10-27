import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lookup } from '../public/lib/dictionary.js';

const first = (q) => lookup(q).results[0];

test('finds nouns with gender and plural', () => {
  const r = first('עיר');
  assert.equal(r.entry.type, 'noun');
  assert.equal(r.entry.gender, 'f');
  assert.equal(r.entry.plural.p, 'ערים');
});

test('finds an entry from any inflected form', () => {
  assert.equal(first('הלכתי').entry.lemma.p, 'ללכת');
  assert.deepEqual(first('הלכתי').matches[0], { kind: 'verb', tense: 'past', slot: '1s' });
  assert.equal(first('גדולות').entry.lemma.p, 'גדול');
  assert.equal(first('שיניים').entry.lemma.p, 'שן');
  assert.equal(first('נתתי').entry.lemma.p, 'לתת');
});

test('works with nikkud, prefixes, spelling variants and English', () => {
  assert.equal(first('שֻׁלְחָן').entry.lemma.p, 'שולחן');
  const pref = first('והספרים');
  assert.equal(pref.entry.lemma.p, 'ספר');
  assert.equal(pref.prefix, 'וה');
  assert.equal(first('דבר').entry.type, 'verb');
  assert.equal(first('write').entry.lemma.p, 'לכתוב');
});

test('unknown words return nothing (so the app can ask AI)', () => {
  assert.equal(lookup('קרנפים').results.length, 0);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allEntries, formsOf } from '../public/lib/dictionary.js';
import { makeExample, plainText, splitBraced, keyVariants } from '../public/lib/sentence.js';
import { searchKey } from '../public/lib/hebrew.js';

test('every built-in word has an example sentence', () => {
  const missing = allEntries().filter((e) => !e.example).map((e) => `${e.type}:${e.lemma.p}`);
  assert.deepEqual(missing, []);
});

test('the highlighted word is a form of the entry', () => {
  const bad = [];
  for (const e of allEntries()) {
    const keys = new Set(formsOf(e).flatMap(({ form }) => [searchKey(form.n), searchKey(form.p)]));
    if (!keyVariants(e.example.key).some((k) => keys.has(k))) bad.push(`${e.lemma.p}: ${e.example.n.word}`);
  }
  assert.deepEqual(bad, []);
});

test('examples have English and a clean plain version', () => {
  for (const e of allEntries()) {
    const { n, p, en } = e.example;
    assert.ok(en && en.length > 3, e.lemma.p);
    for (const part of [p.before, p.word, p.after]) assert.doesNotMatch(part, /[֑-ׇ·]/, e.lemma.p);
    assert.doesNotMatch(n.before + n.word + n.after, /·/, e.lemma.p);
  }
});

test('sentence helpers', () => {
  assert.equal(plainText('הַ·יֶּלֶד לֹא פֹּה.'), 'הילד לא פה.');
  assert.deepEqual(splitBraced('אֲנִי {הוֹלֵךְ} הַבַּיְתָה'), { before: 'אֲנִי ', word: 'הוֹלֵךְ', after: ' הַבַּיְתָה' });
  assert.equal(splitBraced('no braces'), null);
  assert.equal(makeExample('{שָׁלוֹם}!', 'Hello!').p.word, 'שלום');
  assert.deepEqual(keyVariants('והספרים'), ['והספרים', 'הספרים', 'ספרים']);
});

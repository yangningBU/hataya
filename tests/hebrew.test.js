import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toPlain, searchKey, looseKey, stripNikkud } from '../public/lib/hebrew.js';

test('toPlain follows the Academy full-spelling rules', () => {
  const cases = {
    'כָּתַב': 'כתב',
    'כְּתֹב': 'כתוב',
    'דִּבֵּר': 'דיבר',
    'שֻׁלְחָן': 'שולחן',
    'יִכְתֹּב': 'יכתוב',
    'יִכָּתֵב': 'ייכתב',
    'נִהֵל': 'ניהל',
    'שִׁעוּר': 'שיעור',
    'רִאשׁוֹן': 'ראשון',
    'יֹאכַל': 'יאכל',
    'לִמְצֹא': 'למצוא',
    'צִוָּה': 'ציווה',
    'אֲוִיר': 'אוויר',
    'קַו': 'קו',
    'קַוִּים': 'קווים',
    'בַּיִת': 'בית',
    'מַיִם': 'מים',
    'שִׁנַּיִם': 'שיניים',
    'עֵינַיִם': 'עיניים',
    'חַיָּל': 'חייל',
    'עֲנִיָּה': 'ענייה',
    'בְּעָיָה': 'בעיה',
    'מְצֻיָּן': 'מצוין',
    'פְּנוּיָה': 'פנויה',
    'הִתְעַנְיֵן': 'התעניין',
    'חׇכְמָה': 'חוכמה',
    'הׇעׇבְרָה': 'הועברה',
    'צׇהֳרַיִם': 'צוהריים',
  };
  for (const [n, p] of Object.entries(cases)) assert.equal(toPlain(n), p, n);
});

test('search keys ignore nikkud and final letters', () => {
  assert.equal(stripNikkud('שָׁלוֹם'), 'שלום');
  assert.equal(searchKey('שָׁלוֹם'), searchKey('שלומ'));
  assert.equal(looseKey('דיבר'), looseKey('דבר'));
  assert.equal(searchKey('בית ספר'), 'ביתספר');
});

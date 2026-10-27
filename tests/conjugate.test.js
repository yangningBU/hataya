import { test } from 'node:test';
import assert from 'node:assert/strict';
import { conjugate } from '../public/lib/conjugate.js';
import { VERBS } from '../public/lib/lexicon.js';

const forms = (entry, picks) => {
  const c = conjugate(entry);
  return picks.map(([tense, slot]) => (slot ? c[tense][slot].n : c[tense].n));
};
const check = (entry, expected) => {
  const picks = Object.keys(expected).map((k) => k.split('.'));
  const nfc = (a) => a.map((x) => x.normalize('NFC'));
  assert.deepEqual(nfc(forms(entry, picks)), nfc(Object.values(expected)), `${entry.root} ${entry.binyan}`);
};

test("pa'al, strong and guttural roots", () => {
  check({ root: 'כתב', binyan: 'paal' }, {
    'past.1s': 'כָּתַבְתִּי', 'past.3fs': 'כָּתְבָה', 'past.2mp': 'כְּתַבְתֶּם',
    'present.fs': 'כּוֹתֶבֶת', 'future.3ms': 'יִכְתֹּב', 'future.2fs': 'תִּכְתְּבִי',
    'imperative.fs': 'כִּתְבִי', infinitive: 'לִכְתֹּב',
  });
  check({ root: 'עבד', binyan: 'paal' }, { 'future.3ms': 'יַעֲבֹד', 'future.2fs': 'תַּעַבְדִי', 'future.1s': 'אֶעֱבֹד', infinitive: 'לַעֲבֹד', 'past.2mp': 'עֲבַדְתֶּם' });
  check({ root: 'אסף', binyan: 'paal' }, { 'future.3ms': 'יֶאֱסֹף', 'imperative.ms': 'אֱסֹף', infinitive: 'לֶאֱסֹף' });
  check({ root: 'חשׁב', binyan: 'paal' }, { 'future.3ms': 'יַחְשֹׁב', infinitive: 'לַחְשֹׁב' });
  check({ root: 'שׁאל', binyan: 'paal' }, { 'past.3fs': 'שָׁאֲלָה', 'future.3ms': 'יִשְׁאַל', 'imperative.fs': 'שַׁאֲלִי' });
  check({ root: 'שׁמע', binyan: 'paal' }, {
    'present.ms': 'שׁוֹמֵעַ', 'present.fs': 'שׁוֹמַעַת', 'past.2fs': 'שָׁמַעַתְּ', 'future.3ms': 'יִשְׁמַע', infinitive: 'לִשְׁמֹעַ',
  });
  check({ root: 'אכל', binyan: 'paal', pa: true }, { 'future.1s': 'אֹכַל', 'future.3ms': 'יֹאכַל', 'imperative.ms': 'אֱכֹל', infinitive: 'לֶאֱכֹל' });
});

test('weak roots', () => {
  check({ root: 'קנה', binyan: 'paal' }, { 'past.1s': 'קָנִיתִי', 'past.3fs': 'קָנְתָה', 'present.ms': 'קוֹנֶה', 'future.3ms': 'יִקְנֶה', 'imperative.ms': 'קְנֵה', infinitive: 'לִקְנוֹת' });
  check({ root: 'עשׂה', binyan: 'paal' }, { 'future.3ms': 'יַעֲשֶׂה', infinitive: 'לַעֲשׂוֹת', 'past.2mp': 'עֲשִׂיתֶם' });
  check({ root: 'מצא', binyan: 'paal' }, { 'past.1s': 'מָצָאתִי', 'present.fs': 'מוֹצֵאת', 'future.3ms': 'יִמְצָא', infinitive: 'לִמְצֹא' });
  check({ root: 'קום', binyan: 'paal' }, { 'past.1s': 'קַמְתִּי', 'present.ms': 'קָם', 'future.3ms': 'יָקוּם', infinitive: 'לָקוּם' });
  check({ root: 'שׂים', binyan: 'paal' }, { 'future.3ms': 'יָשִׂים', 'imperative.ms': 'שִׂים' });
  check({ root: 'ישׁב', binyan: 'paal', py: true }, { 'future.3ms': 'יֵשֵׁב', 'imperative.ms': 'שֵׁב', infinitive: 'לָשֶׁבֶת' });
  check({ root: 'ידע', binyan: 'paal', py: true }, { 'future.3ms': 'יֵדַע', 'imperative.ms': 'דַּע', infinitive: 'לָדַעַת' });
  check({ root: 'נפל', binyan: 'paal', pn: true }, { 'future.3ms': 'יִפֹּל', 'imperative.ms': 'נְפֹל' });
  check({ root: 'נתן', binyan: 'paal', pn: true, fut: 'e', assimilateN: true }, { 'past.1s': 'נָתַתִּי', 'past.1p': 'נָתַנּוּ', 'future.3ms': 'יִתֵּן' });
});

test('derived binyanim', () => {
  check({ root: 'כתב', binyan: 'nifal' }, { 'past.3ms': 'נִכְתַּב', 'present.fs': 'נִכְתֶּבֶת', 'future.3ms': 'יִכָּתֵב', infinitive: 'לְהִכָּתֵב' });
  check({ root: 'עזר', binyan: 'nifal' }, { 'past.3ms': 'נֶעֱזַר', 'past.3fs': 'נֶעֶזְרָה', 'future.3ms': 'יֵעָזֵר' });
  check({ root: 'ילד', binyan: 'nifal' }, { 'past.3ms': 'נוֹלַד', 'future.3ms': 'יִוָּלֵד' });
  check({ root: 'דבר', binyan: 'piel' }, { 'past.3ms': 'דִּבֵּר', 'past.1s': 'דִּבַּרְתִּי', 'present.ms': 'מְדַבֵּר', 'future.1s': 'אֲדַבֵּר', 'imperative.ms': 'דַּבֵּר', infinitive: 'לְדַבֵּר' });
  check({ root: 'ברך', binyan: 'piel' }, { 'present.ms': 'מְבָרֵךְ', 'past.3fs': 'בֵּרְכָה' });
  check({ root: 'נהל', binyan: 'piel' }, { 'past.3ms': 'נִהֵל', 'present.mp': 'מְנַהֲלִים' });
  check({ root: 'תרגם', binyan: 'piel' }, { 'past.3ms': 'תִּרְגֵּם', 'present.ms': 'מְתַרְגֵּם' });
  check({ root: 'דבר', binyan: 'pual' }, { 'past.3ms': 'דֻּבַּר', 'present.ms': 'מְדֻבָּר' });
  check({ root: 'לבשׁ', binyan: 'hifil' }, { 'past.3ms': 'הִלְבִּישׁ', 'past.1s': 'הִלְבַּשְׁתִּי', 'present.ms': 'מַלְבִּישׁ', 'imperative.ms': 'הַלְבֵּשׁ', infinitive: 'לְהַלְבִּישׁ' });
  check({ root: 'עבר', binyan: 'hifil' }, { 'past.3ms': 'הֶעֱבִיר', 'present.ms': 'מַעֲבִיר' });
  check({ root: 'בין', binyan: 'hifil' }, { 'past.3ms': 'הֵבִין', 'past.1s': 'הֵבַנְתִּי', 'present.fs': 'מְבִינָה', 'future.3ms': 'יָבִין' });
  check({ root: 'ירד', binyan: 'hifil' }, { 'past.3ms': 'הוֹרִיד', 'future.2ms': 'תּוֹרִיד' });
  check({ root: 'נגע', binyan: 'hifil', pn: true }, { 'past.3ms': 'הִגִּיעַ', 'past.1s': 'הִגַּעְתִּי', infinitive: 'לְהַגִּיעַ' });
  check({ root: 'לבשׁ', binyan: 'hufal' }, { 'past.3ms': 'הֻלְבַּשׁ', 'present.ms': 'מֻלְבָּשׁ' });
  check({ root: 'לבשׁ', binyan: 'hitpael' }, { 'past.3ms': 'הִתְלַבֵּשׁ', 'present.ms': 'מִתְלַבֵּשׁ', infinitive: 'לְהִתְלַבֵּשׁ' });
  check({ root: 'סדר', binyan: 'hitpael' }, { 'past.3ms': 'הִסְתַּדֵּר' });
  check({ root: 'צלם', binyan: 'hitpael' }, { 'past.3ms': 'הִצְטַלֵּם' });
  check({ root: 'זקן', binyan: 'hitpael' }, { 'past.3ms': 'הִזְדַּקֵּן' });
  check({ root: 'גלה', binyan: 'hitpael' }, { 'past.1s': 'הִתְגַּלֵּיתִי', infinitive: 'לְהִתְגַּלּוֹת' });
});

test("hif'il plain spelling has no yod after the prefix", () => {
  const c = conjugate({ root: 'נגע', binyan: 'hifil', pn: true });
  assert.equal(c.past['3ms'].p, 'הגיע');
  assert.equal(c.past['1s'].p, 'הגעתי');
  assert.equal(conjugate({ root: 'נפל', binyan: 'hifil', pn: true }).past['3ms'].p, 'הפיל');
  assert.equal(conjugate({ root: 'לבשׁ', binyan: 'hifil' }).past['3ms'].p, 'הלביש');
});

test('every lexicon verb conjugates without leftover template symbols', () => {
  for (const v of VERBS) {
    const c = conjugate({ root: v.r, binyan: v.b, ...v });
    const all = [c.infinitive, ...['past', 'present', 'future', 'imperative'].flatMap((t) => Object.values(c[t] || {}))].filter(Boolean);
    assert.ok(all.length > 0, `${v.r} ${v.b} has no forms`);
    for (const f of all) {
      assert.match(f.n, /^[֑-ׇא-ת ]+$/, `${v.r} ${v.b}: ${f.n}`);
      assert.match(f.p, /^[א-ת ]+$/, `${v.r} ${v.b}: ${f.p}`);
    }
  }
});

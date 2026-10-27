// Rule-based Hebrew verb conjugation.
//
// Each paradigm is a set of templates. In a template:
//   1 2 3 4   root letters (radicals)
//   *         doubling dagesh (dagesh forte) on the preceding radical
//   :         vocal sheva (shva na); a plain sheva sign is a silent sheva
//   ^         suppress dagesh kal on the preceding radical
//   E         tsere that becomes patah when the last radical is ח/ע
//   S         a vocal sheva here becomes hataf-segol (not hataf-patah) under א
// Hebrew letters and vowel signs are copied literally.
//
// After the template is filled in, phonological rules handle dagesh kal,
// guttural letters (א ה ח ע and ר), furtive patah and assimilation, so one
// set of templates covers most regular verbs.

import {
  SHEVA, HATAF_SEGOL, HATAF_PATAH, HATAF_QAMATS, HIRIQ, TSERE, SEGOL, PATAH,
  QAMATS, HOLAM, QUBUTS, DAGESH, SHIN_DOT, SIN_DOT, QAMATS_QATAN, VOWELS,
  HATAFS, isLetter, toFinal, toPlain,
} from './hebrew.js';

export const BINYANIM = {
  paal: { he: 'פָּעַל', en: "Pa'al" },
  nifal: { he: 'נִפְעַל', en: "Nif'al" },
  piel: { he: 'פִּעֵל', en: "Pi'el" },
  pual: { he: 'פֻּעַל', en: "Pu'al" },
  hifil: { he: 'הִפְעִיל', en: "Hif'il" },
  hufal: { he: 'הֻפְעַל', en: "Huf'al" },
  hitpael: { he: 'הִתְפַּעֵל', en: "Hitpa'el" },
};

export const SLOTS = {
  past: ['1s', '2ms', '2fs', '3ms', '3fs', '1p', '2mp', '2fp', '3p'],
  present: ['ms', 'fs', 'mp', 'fp'],
  future: ['1s', '2ms', '2fs', '3ms', '3fs', '1p', '2mp', '2fp', '3mp', '3fp'],
  imperative: ['ms', 'fs', 'mp', 'fp'],
};

const GUT = 'אהחע';
const GUT_R = 'אהחער';
const BGDKPT = 'בגדכפת';

// ---------------------------------------------------------------- paradigm builders

function past(a, ms3, v, d) {
  return {
    '1s': a + 'תִּי', '2ms': a + 'תָּ', '2fs': a + 'תְּ', '3ms': ms3, '3fs': v + 'ָה',
    '1p': a + 'נוּ', '2mp': d + 'תֶּם', '2fp': d + 'תֶּן', '3p': v + 'וּ',
  };
}
// ל"ה: a = stem before the -יתי endings (vowel included)
function pastLH(a, ms3, fs3, p3, d) {
  return {
    '1s': a + 'יתִי', '2ms': a + 'יתָ', '2fs': a + 'ית', '3ms': ms3, '3fs': fs3,
    '1p': a + 'ינוּ', '2mp': d + 'יתֶם', '2fp': d + 'יתֶן', '3p': p3,
  };
}
// ל"א: alef is quiescent before consonantal endings, so ת takes no dagesh
function pastLA(a, ms3, v, d) {
  return {
    '1s': a + 'תִי', '2ms': a + 'תָ', '2fs': a + 'ת', '3ms': ms3, '3fs': v + 'ָה',
    '1p': a + 'נוּ', '2mp': d + 'תֶם', '2fp': d + 'תֶן', '3p': v + 'וּ',
  };
}
function present(ms, fs, pl) {
  return { ms, fs, mp: pl + 'ִים', fp: pl + 'וֹת' };
}
function future(pre, stem, v, fp) {
  const [p1, pT, pY, pN] = pre;
  return {
    '1s': p1 + stem, '2ms': pT + stem, '2fs': pT + v + 'ִי', '3ms': pY + stem,
    '3fs': pT + stem, '1p': pN + stem, '2mp': pT + v + 'וּ', '2fp': pT + fp + 'נָה',
    '3mp': pY + v + 'וּ', '3fp': pT + fp + 'נָה',
  };
}
function imperative(ms, v, fp) {
  return { ms, fs: v + 'ִי', mp: v + 'וּ', fp: fp + 'נָה' };
}

const PRE = {
  paal: ['אֶ', 'תִּ', 'יִ', 'נִ'],
  hifil: ['אַ', 'תַּ', 'יַ', 'נַ'],
  piel: ['אֲ', 'תּ:', 'י:', 'נ:'],
  hufal: ['אֻ', 'תֻּ', 'יֻ', 'נֻ'],
  hitpael: ['אֶתְ', 'תִּתְ', 'יִתְ', 'נִתְ'],
  ayin: ['אָ', 'תָּ', 'יָ', 'נָ'],
  py: ['אֵ', 'תֵּ', 'יֵ', 'נֵ'],
  pyI: ['אִי', 'תִּי', 'יִי', 'נִי'],
  pa: ['אֹ', 'תֹּ', 'יֹ', 'נֹ'],
};

/** Strong-root paradigms (also used, with rules, for guttural roots). */
function strong(binyan, V) {
  switch (binyan) {
    case 'paal': return {
      past: past('1ָ2ַ3ְ', '1ָ2ַ3', '1ָ2:3', '1:2ַ3ְ'),
      present: present('1וֹ2ֵ3', '1וֹ2ֶ3ֶת', '1וֹ2:3'),
      future: future(PRE.paal, `1ְ2${V}3`, '1ְ2:3', `1ְ2${V}3ְ`),
      imperative: imperative(`1:S2${V}3`, '1ִ2ְ3^', `1:S2${V}3ְ`),
      infinitive: 'לִ1ְ2ֹ3',
    };
    case 'nifal': return {
      past: past('נִ1ְ2ַ3ְ', 'נִ1ְ2ַ3', 'נִ1ְ2:3', 'נִ1ְ2ַ3ְ'),
      present: present('נִ1ְ2ָ3', 'נִ1ְ2ֶ3ֶת', 'נִ1ְ2ָ3'),
      future: future(PRE.paal, '1*ָ2E3', '1*ָ2:3', '1*ָ2ַ3ְ'),
      imperative: imperative('הִ1*ָ2E3', 'הִ1*ָ2:3', 'הִ1*ָ2ַ3ְ'),
      infinitive: 'לְהִ1*ָ2E3',
    };
    case 'piel': return {
      past: past('1ִ2*ַ3ְ', '1ִ2*E3', '1ִ2*:3', '1ִ2*ַ3ְ'),
      present: present('מ:1ַ2*ֵ3', 'מ:1ַ2*ֶ3ֶת', 'מ:1ַ2*:3'),
      future: future(PRE.piel, '1ַ2*E3', '1ַ2*:3', '1ַ2*E3ְ'),
      imperative: imperative('1ַ2*E3', '1ַ2*:3', '1ַ2*E3ְ'),
      infinitive: 'ל:1ַ2*ֵ3',
    };
    case 'pual': return {
      past: past('1ֻ2*ַ3ְ', '1ֻ2*ַ3', '1ֻ2*:3', '1ֻ2*ַ3ְ'),
      present: present('מ:1ֻ2*ָ3', 'מ:1ֻ2*ֶ3ֶת', 'מ:1ֻ2*ָ3'),
      future: future(PRE.piel, '1ֻ2*ַ3', '1ֻ2*:3', '1ֻ2*ַ3ְ'),
      imperative: null,
      infinitive: null,
    };
    case 'hifil': return {
      past: past('הִ1ְ2ַ3ְ', 'הִ1ְ2ִי3', 'הִ1ְ2ִי3', 'הִ1ְ2ַ3ְ'),
      present: present('מַ1ְ2ִי3', 'מַ1ְ2ִי3ָה', 'מַ1ְ2ִי3'),
      future: future(PRE.hifil, '1ְ2ִי3', '1ְ2ִי3', '1ְ2E3ְ'),
      imperative: imperative('הַ1ְ2E3', 'הַ1ְ2ִי3', 'הַ1ְ2E3ְ'),
      infinitive: 'ל:הַ1ְ2ִי3',
    };
    case 'hufal': return {
      past: past('הֻ1ְ2ַ3ְ', 'הֻ1ְ2ַ3', 'הֻ1ְ2:3', 'הֻ1ְ2ַ3ְ'),
      present: present('מֻ1ְ2ָ3', 'מֻ1ְ2ֶ3ֶת', 'מֻ1ְ2ָ3'),
      future: future(PRE.hufal, '1ְ2ַ3', '1ְ2:3', '1ְ2ַ3ְ'),
      imperative: null,
      infinitive: null,
    };
    case 'hitpael': return {
      past: past('הִתְ1ַ2*ַ3ְ', 'הִתְ1ַ2*ֵ3', 'הִתְ1ַ2*:3', 'הִתְ1ַ2*ַ3ְ'),
      present: present('מִתְ1ַ2*ֵ3', 'מִתְ1ַ2*ֶ3ֶת', 'מִתְ1ַ2*:3'),
      future: future(PRE.hitpael, '1ַ2*ֵ3', '1ַ2*:3', '1ַ2*E3ְ'),
      imperative: imperative('הִתְ1ַ2*ֵ3', 'הִתְ1ַ2*:3', 'הִתְ1ַ2*E3ְ'),
      infinitive: 'ל:הִתְ1ַ2*ֵ3',
    };
  }
  return null;
}

/** ל"ה roots (third radical ה). */
function lamedHe(binyan) {
  switch (binyan) {
    case 'paal': return {
      past: pastLH('1ָ2ִ', '1ָ2ָה', '1ָ2:תָה', '1ָ2וּ', '1:2ִ'),
      present: present('1וֹ2ֶה', '1וֹ2ָה', '1וֹ2'),
      future: future(PRE.paal, '1ְ2ֶה', '1ְ2', '1ְ2ֶי'),
      imperative: imperative('1:2ֵה', '1:2', '1:2ֶי'),
      infinitive: 'לִ1ְ2וֹת',
    };
    case 'nifal': return {
      past: pastLH('נִ1ְ2ֵ', 'נִ1ְ2ָה', 'נִ1ְ2:תָה', 'נִ1ְ2וּ', 'נִ1ְ2ֵ'),
      present: present('נִ1ְ2ֶה', 'נִ1ְ2ֵית', 'נִ1ְ2'),
      future: future(PRE.paal, '1*ָ2ֶה', '1*ָ2', '1*ָ2ֶי'),
      imperative: imperative('הִ1*ָ2ֵה', 'הִ1*ָ2', 'הִ1*ָ2ֶי'),
      infinitive: 'לְהִ1*ָ2וֹת',
    };
    case 'piel': return {
      past: pastLH('1ִ2*ִ', '1ִ2*ָה', '1ִ2*:תָה', '1ִ2*וּ', '1ִ2*ִ'),
      present: present('מ:1ַ2*ֶה', 'מ:1ַ2*ָה', 'מ:1ַ2*'),
      future: future(PRE.piel, '1ַ2*ֶה', '1ַ2*', '1ַ2*ֶי'),
      imperative: imperative('1ַ2*ֵה', '1ַ2*', '1ַ2*ֶי'),
      infinitive: 'ל:1ַ2*וֹת',
    };
    case 'pual': return {
      past: pastLH('1ֻ2*ֵ', '1ֻ2*ָה', '1ֻ2*:תָה', '1ֻ2*וּ', '1ֻ2*ֵ'),
      present: present('מ:1ֻ2*ֶה', 'מ:1ֻ2*ָה', 'מ:1ֻ2*'),
      future: future(PRE.piel, '1ֻ2*ֶה', '1ֻ2*', '1ֻ2*ֶי'),
      imperative: null,
      infinitive: null,
    };
    case 'hifil': return {
      past: pastLH('הִ1ְ2ֵ', 'הִ1ְ2ָה', 'הִ1ְ2:תָה', 'הִ1ְ2וּ', 'הִ1ְ2ֵ'),
      present: present('מַ1ְ2ֶה', 'מַ1ְ2ָה', 'מַ1ְ2'),
      future: future(PRE.hifil, '1ְ2ֶה', '1ְ2', '1ְ2ֶי'),
      imperative: imperative('הַ1ְ2ֵה', 'הַ1ְ2', 'הַ1ְ2ֶי'),
      infinitive: 'ל:הַ1ְ2וֹת',
    };
    case 'hufal': return {
      past: pastLH('הֻ1ְ2ֵ', 'הֻ1ְ2ָה', 'הֻ1ְ2:תָה', 'הֻ1ְ2וּ', 'הֻ1ְ2ֵ'),
      present: present('מֻ1ְ2ֶה', 'מֻ1ְ2ֵית', 'מֻ1ְ2'),
      future: future(PRE.hufal, '1ְ2ֶה', '1ְ2', '1ְ2ֶי'),
      imperative: null,
      infinitive: null,
    };
    case 'hitpael': return {
      past: pastLH('הִתְ1ַ2*ֵ', 'הִתְ1ַ2*ָה', 'הִתְ1ַ2*:תָה', 'הִתְ1ַ2*וּ', 'הִתְ1ַ2*ֵ'),
      present: present('מִתְ1ַ2*ֶה', 'מִתְ1ַ2*ָה', 'מִתְ1ַ2*'),
      future: future(PRE.hitpael, '1ַ2*ֶה', '1ַ2*', '1ַ2*ֶי'),
      imperative: imperative('הִתְ1ַ2*ֵה', 'הִתְ1ַ2*', 'הִתְ1ַ2*ֶי'),
      infinitive: 'ל:הִתְ1ַ2*וֹת',
    };
  }
  return null;
}

/** ל"א roots (third radical א, quiescent at syllable end). */
function lamedAlef(binyan) {
  switch (binyan) {
    case 'paal': return {
      past: pastLA('1ָ2ָ3', '1ָ2ָ3', '1ָ2:3', '1:2ָ3'),
      present: present('1וֹ2ֵ3', '1וֹ2ֵ3ת', '1וֹ2:3'),
      future: future(PRE.paal, '1ְ2ָ3', '1ְ2:3', '1ְ2ֶ3'),
      imperative: imperative('1:S2ָ3', '1ִ2ְ3^', '1:S2ֶ3'),
      infinitive: 'לִ1ְ2ֹ3',
    };
    case 'nifal': return {
      past: pastLA('נִ1ְ2ֵ3', 'נִ1ְ2ָ3', 'נִ1ְ2:3', 'נִ1ְ2ֵ3'),
      present: present('נִ1ְ2ָ3', 'נִ1ְ2ֵ3ת', 'נִ1ְ2ָ3'),
      future: future(PRE.paal, '1*ָ2ֵ3', '1*ָ2:3', '1*ָ2ֶ3'),
      imperative: imperative('הִ1*ָ2ֵ3', 'הִ1*ָ2:3', 'הִ1*ָ2ֶ3'),
      infinitive: 'לְהִ1*ָ2ֵ3',
    };
    case 'piel': return {
      past: pastLA('1ִ2*ֵ3', '1ִ2*ֵ3', '1ִ2*:3', '1ִ2*ֵ3'),
      present: present('מ:1ַ2*ֵ3', 'מ:1ַ2*ֵ3ת', 'מ:1ַ2*:3'),
      future: future(PRE.piel, '1ַ2*ֵ3', '1ַ2*:3', '1ַ2*ֶ3'),
      imperative: imperative('1ַ2*ֵ3', '1ַ2*:3', '1ַ2*ֶ3'),
      infinitive: 'ל:1ַ2*ֵ3',
    };
    case 'pual': return {
      past: pastLA('1ֻ2*ֵ3', '1ֻ2*ָ3', '1ֻ2*:3', '1ֻ2*ֵ3'),
      present: present('מ:1ֻ2*ָ3', 'מ:1ֻ2*ֵ3ת', 'מ:1ֻ2*ָ3'),
      future: future(PRE.piel, '1ֻ2*ָ3', '1ֻ2*:3', '1ֻ2*ֶ3'),
      imperative: null,
      infinitive: null,
    };
    case 'hifil': return {
      past: pastLA('הִ1ְ2ֵ3', 'הִ1ְ2ִי3', 'הִ1ְ2ִי3', 'הִ1ְ2ֵ3'),
      present: present('מַ1ְ2ִי3', 'מַ1ְ2ִי3ָה', 'מַ1ְ2ִי3'),
      future: future(PRE.hifil, '1ְ2ִי3', '1ְ2ִי3', '1ְ2ֶ3'),
      imperative: imperative('הַ1ְ2ֵ3', 'הַ1ְ2ִי3', 'הַ1ְ2ֶ3'),
      infinitive: 'ל:הַ1ְ2ִי3',
    };
    case 'hufal': return {
      past: pastLA('הֻ1ְ2ֵ3', 'הֻ1ְ2ָ3', 'הֻ1ְ2:3', 'הֻ1ְ2ֵ3'),
      present: present('מֻ1ְ2ָ3', 'מֻ1ְ2ֵ3ת', 'מֻ1ְ2ָ3'),
      future: future(PRE.hufal, '1ְ2ָ3', '1ְ2:3', '1ְ2ֶ3'),
      imperative: null,
      infinitive: null,
    };
    case 'hitpael': return {
      past: pastLA('הִתְ1ַ2*ֵ3', 'הִתְ1ַ2*ֵ3', 'הִתְ1ַ2*:3', 'הִתְ1ַ2*ֵ3'),
      present: present('מִתְ1ַ2*ֵ3', 'מִתְ1ַ2*ֵ3ת', 'מִתְ1ַ2*:3'),
      future: future(PRE.hitpael, '1ַ2*ֵ3', '1ַ2*:3', '1ַ2*ֶ3'),
      imperative: imperative('הִתְ1ַ2*ֵ3', 'הִתְ1ַ2*:3', 'הִתְ1ַ2*ֶ3'),
      infinitive: 'ל:הִתְ1ַ2*ֵ3',
    };
  }
  return null;
}

/** ע"ו / ע"י roots (hollow middle radical). `mid` is 'וּ' or 'ִי'. */
function hollow(binyan, mid) {
  const short = mid === 'וּ' ? 'ֹ' : 'ֵ';
  switch (binyan) {
    case 'paal': return {
      past: past('1ַ3ְ', '1ָ3', '1ָ3', '1ַ3ְ'),
      present: present('1ָ3', '1ָ3ָה', '1ָ3'),
      future: future(PRE.ayin, `1${mid}3`, `1${mid}3`, `1${short}3ְ`),
      imperative: imperative(`1${mid}3`, `1${mid}3`, `1${short}3ְ`),
      infinitive: `לָ1${mid}3`,
    };
    case 'hifil': return {
      past: { ...past('הֵ1ַ3ְ', 'הֵ1ִי3', 'הֵ1ִי3', 'הֲ1ַ3ְ') },
      present: present('מֵ1ִי3', 'מ:1ִי3ָה', 'מ:1ִי3'),
      future: future(PRE.ayin, '1ִי3', '1ִי3', '1ֵ3ְ'),
      imperative: imperative('הָ1ֵ3', 'הָ1ִי3', 'הָ1ֵ3ְ'),
      infinitive: 'ל:הָ1ִי3',
    };
    case 'hufal': return {
      past: past('הוּ1ַ3ְ', 'הוּ1ַ3', 'הוּ1:3', 'הוּ1ַ3ְ'),
      present: present('מוּ1ָ3', 'מוּ1ֶ3ֶת', 'מוּ1ָ3'),
      future: future(['אוּ', 'תּוּ', 'יוּ', 'נוּ'], '1ַ3', '1:3', '1ַ3ְ'),
      imperative: null,
      infinitive: null,
    };
  }
  return null;
}

// ---------------------------------------------------------------- template transforms

const mapTemplates = (p, fn) => {
  if (!p) return p;
  const out = {};
  for (const [tense, val] of Object.entries(p)) {
    if (val == null) out[tense] = val;
    else if (typeof val === 'string') out[tense] = fn(val, tense);
    else out[tense] = Object.fromEntries(Object.entries(val).map(([k, t]) => [k, fn(t, tense, k)]));
  }
  return out;
};

// פ"נ: a nun closing a syllable assimilates into the next radical.
const assimilateNun = (t) => t.replace('1ְ2', '2*');

// פ"י in nif'al / hif'il / huf'al: yod becomes a vowel letter (נוֹלַד, הוֹרִיד, הוּרַד).
function peYod(t, binyan) {
  if (binyan === 'hifil' || binyan === 'nifal') {
    t = t.replace(/([א-ת])([ִַּ]+)1ְ/, (m, l, marks) => l + (marks.includes(DAGESH) ? DAGESH : '') + 'וֹ');
  }
  if (binyan === 'hufal') {
    t = t.replace(/([א-ת])([ֻּ]+)1ְ/, (m, l, marks) => l + (marks.includes(DAGESH) ? DAGESH : '') + 'וּ');
  }
  if (binyan === 'nifal') t = t.replace('1*ָ', 'וָּ');
  return t;
}

// Four-letter roots (תרגם, טלפן): the doubled middle radical becomes two radicals.
const quadrilateral = (t) => t.replace(/3/g, '4').replace('2*', '2ְ3');

// פ"י pa'al with a dropped yod: יֵשֵׁב, שֵׁב, לָשֶׁבֶת
function peYodPaal(p) {
  return {
    ...p,
    future: future(PRE.py, '2E3', '2:3', '2ַ3ְ'),
    imperative: imperative('2E3', '2:3', '2E3ְ'),
    infinitive: 'לָ2ֶ3ֶת',
  };
}
// פ"י pa'al keeping the yod: יִירַשׁ, יִישַׁן
function peYodPaalKeep(p) {
  return { ...p, future: future(PRE.pyI, '2ַ3', '2:3', '2ַ3ְ'), infinitive: 'לִי2ֹ3' };
}
// פ"א pa'al: יֹאכַל, יֹאמַר (alef is silent, 1s is אֹכַל)
function peAlefPaal(p) {
  const f = future(PRE.pa, '12ַ3', '12:3', '12ַ3ְ');
  f['1s'] = 'אֹ2ַ3';
  return { ...p, future: f, imperative: imperative('1:S2ֹ3', '1ִ2ְ3^', '1:S2ֹ3ְ') };
}

// ---------------------------------------------------------------- template engine

export function parseRoot(root) {
  const out = [];
  for (const ch of root.normalize('NFC')) {
    if (isLetter(ch)) out.push({ l: ch.replace(/[ךםןףץ]/, (c) => ({ 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' })[c]), dot: '' });
    else if ((ch === SHIN_DOT || ch === SIN_DOT) && out.length) out[out.length - 1].dot = ch;
  }
  for (const r of out) if (r.l === 'ש' && !r.dot) r.dot = SHIN_DOT;
  return out;
}

function parseTemplate(t, root) {
  const units = [];
  let cur = null;
  for (const ch of t) {
    if (ch >= '1' && ch <= '4') {
      const r = +ch;
      const rl = root[r - 1];
      cur = { l: rl.l, dot: rl.dot || '', r, dag: false, forte: false, v: '', vocal: false };
      units.push(cur);
    } else if (isLetter(ch)) {
      cur = { l: ch, dot: '', r: 0, dag: false, forte: false, v: '', vocal: false };
      units.push(cur);
    } else if (ch === DAGESH) cur.dag = true;
    else if (ch === '*') { cur.dag = true; cur.forte = true; }
    else if (ch === SHIN_DOT || ch === SIN_DOT) cur.dot = ch;
    else if (ch === ':') { cur.v = SHEVA; cur.vocal = true; }
    else if (ch === SHEVA) { cur.v = SHEVA; cur.vocal = false; }
    else if (ch === '^') cur.noKal = true;
    else if (ch === 'E') { cur.v = TSERE; cur.eToPatah = true; }
    else if (ch === 'S') cur.segolHataf = true;
    else if (VOWELS.has(ch)) cur.v = ch;
  }
  units.forEach((u, i) => {
    if (u.r) return;
    if (u.l === 'ו' && (u.v === HOLAM || (u.dag && !u.v))) u.mater = true;
    if (u.l === 'י' && !u.v && !u.dag && i > 0) u.mater = true;
    if (u.l === 'ה' && !u.v && i === units.length - 1) u.mater = true;
  });
  return units;
}

const LENGTHEN = { [HIRIQ]: TSERE, [PATAH]: QAMATS, [QUBUTS]: HOLAM, [SEGOL]: TSERE };
const HATAF_FOR = { [PATAH]: HATAF_PATAH, [SEGOL]: HATAF_SEGOL, [QAMATS_QATAN]: HATAF_QAMATS, [QAMATS]: HATAF_PATAH };
const FULL_OF_HATAF = { [HATAF_PATAH]: PATAH, [HATAF_SEGOL]: SEGOL, [HATAF_QAMATS]: QAMATS_QATAN };

function applyRules(units, ctx) {
  const { binyan, lastR } = ctx;

  // Hitpa'el metathesis: הִתְסַדֵּר -> הִסְתַּדֵּר, הִתְצַלֵּם -> הִצְטַלֵּם, הִתְזַקֵּן -> הִזְדַּקֵּן
  if (binyan === 'hitpael') {
    const i = units.findIndex((u, k) => !u.r && u.l === 'ת' && units[k + 1] && units[k + 1].r === 1);
    if (i >= 0) {
      const t = units[i];
      const c1 = units[i + 1];
      const sib = c1.l === 'ס' || c1.l === 'ש' || c1.l === 'צ' || c1.l === 'ז';
      if (sib) {
        const tl = c1.l === 'צ' ? 'ט' : c1.l === 'ז' ? 'ד' : 'ת';
        units[i] = { ...c1, v: SHEVA, vocal: false };
        units[i + 1] = { ...t, l: tl, v: c1.v, dag: tl !== 'ט' };
      }
    }
  }

  // Dagesh kal on radicals at word start or after a silent sheva.
  units.forEach((u, i) => {
    if (!u.r || u.forte || u.noKal || !BGDKPT.includes(u.l)) return;
    const p = units[i - 1];
    if (!p || (p.v === SHEVA && !p.vocal && !p.mater)) u.dag = true;
  });

  // Gutturals and ר cannot be doubled: drop the dagesh, lengthen the vowel before
  // (always in nif'al; for the middle radical only with א and ר).
  units.forEach((u, i) => {
    if (!u.forte || !GUT_R.includes(u.l)) return;
    u.dag = false;
    const p = units[i - 1];
    const compensate = u.r === 1 || 'אר'.includes(u.l);
    if (compensate && p && LENGTHEN[p.v]) p.v = LENGTHEN[p.v];
  });

  // A vocal sheva under a guttural becomes a hataf.
  for (const u of units) {
    if (u.v === SHEVA && u.vocal && GUT.includes(u.l)) {
      u.v = u.segolHataf && u.l === 'א' ? HATAF_SEGOL : HATAF_PATAH;
    }
  }

  // A silent sheva under a guttural first radical after a prefix: the prefix
  // vowel shifts and the guttural takes a matching hataf (יַעֲבֹד, נֶעֱלַם, הֶעֱבִיר).
  units.forEach((u, i) => {
    if (u.r !== 1 || u.v !== SHEVA || u.vocal || !GUT.includes(u.l) || i === 0) return;
    const p = units[i - 1];
    if (p.v === HIRIQ) p.v = binyan === 'paal' ? (ctx.c1Type === 'e' ? SEGOL : PATAH) : SEGOL;
    else if (p.v === QUBUTS) p.v = QAMATS_QATAN;
    const silent = ctx.c1Silent ?? u.l === 'ח';
    if (silent || !HATAF_FOR[p.v]) return;
    u.v = HATAF_FOR[p.v];
    u.vocal = true;
    const n = units[i + 1];
    if (n && n.r && !n.forte) n.dag = false;
  });

  // In pa'al imperative (שִׁמְעִי-type) a guttural middle radical opens up: שַׁאֲלִי
  if (binyan === 'paal') {
    units.forEach((u, i) => {
      if (u.r !== 2 || u.v !== SHEVA || u.vocal || !GUT.includes(u.l)) return;
      u.v = HATAF_PATAH;
      u.vocal = true;
      const p = units[i - 1];
      if (p && p.v === HIRIQ) p.v = PATAH;
    });
  }

  // A hataf directly before a vocal sheva becomes a full vowel: תַּעַבְדִי
  units.forEach((u, i) => {
    const n = units[i + 1];
    if (HATAFS.has(u.v) && n && n.v === SHEVA && n.vocal) {
      u.v = FULL_OF_HATAF[u.v];
      n.vocal = false;
    }
  });

  // Third radical ח/ע (ל"ג): patah instead of tsere, furtive patah, segolates.
  const last = units.findIndex((u) => u.r === lastR);
  const lastU = units[last];
  if (lastU && 'חע'.includes(lastU.l)) {
    for (const u of units) if (u.eToPatah) u.v = PATAH;
    const p = units[last - 1];
    const n = units[last + 1];
    if (last === units.length - 1 && !lastU.v && p && (p.mater || p.v === TSERE || p.v === HOLAM)) {
      lastU.v = PATAH;
    }
    if (lastU.v === SEGOL && p && p.v === SEGOL && n && n.l === 'ת') {
      lastU.v = PATAH;
      p.v = PATAH;
    }
    if (lastU.v === SHEVA && n && n.l === 'ת' && last + 1 === units.length - 1 && n.v === SHEVA) {
      lastU.v = PATAH;
    }
  }

  // Assimilation of a final ת/נ into an identical suffix letter: כָּרַתִּי, שָׁכַנּוּ
  for (let i = 0; i < units.length - 1; i++) {
    const u = units[i];
    const n = units[i + 1];
    if (u.r !== lastR || u.v !== SHEVA || n.r) continue;
    const same = n.l === u.l && (u.l === 'ת' || u.l === 'נ');
    const nunToTav = ctx.assimilateN && u.l === 'נ' && n.l === 'ת';
    if (same || nunToTav) {
      u.l = n.l;
      u.dag = true;
      u.v = n.v;
      u.vocal = n.vocal;
      units.splice(i + 1, 1);
    }
  }
  return units;
}

function render(units) {
  let s = '';
  units.forEach((u, i) => {
    const isLast = i === units.length - 1;
    const l = isLast ? toFinal(u.l) : u.l;
    s += l + u.dot + (u.dag ? DAGESH : '') + (u.v || '');
    if (isLast && l === 'ך' && !u.v) s += SHEVA;
  });
  return s.normalize('NFC');
}

/** Split an explicit "nikkud|plain" form into its parts. */
function explicitForm(s) {
  if (s == null) return null;
  const [n, p] = s.normalize('NFC').split('|');
  return { n, p: p || toPlain(n) };
}

// ---------------------------------------------------------------- public API

/**
 * Work out which paradigm a lexicon entry uses.
 * entry: { root, binyan, gizra?, fut?, c1?, c1Silent?, py?, pn?, pa?, assimilateN? }
 */
export function gizraOf(entry) {
  const root = parseRoot(entry.root);
  if (entry.gizra) return entry.gizra;
  if (root.length === 4) return 'quad';
  if (root[2].l === 'ה') return 'lh';
  if (root[2].l === 'א') return 'la';
  if ((root[1].l === 'ו' || root[1].l === 'י') && ['paal', 'hifil', 'hufal'].includes(entry.binyan)) return 'hollow';
  return 'strong';
}

// Pa'al future stem vowel: holam (יִכְתֹּב), patah (יִלְמַד, guttural roots) or tsere (יִתֵּן).
function futureVowelOf(entry, root) {
  if (entry.fut) return entry.fut;
  if (root.length < 3) return 'o';
  return GUT.includes(root[1].l) || 'חע'.includes(root[2].l) ? 'a' : 'o';
}

export function paradigmFor(entry) {
  const root = parseRoot(entry.root);
  const { binyan } = entry;
  const gizra = gizraOf(entry);
  let p;
  if (gizra === 'lh') p = lamedHe(binyan);
  else if (gizra === 'la') p = lamedAlef(binyan);
  else if (gizra === 'hollow') p = hollow(binyan, root[1].l === 'י' ? 'ִי' : 'וּ');
  else {
    let V = HOLAM;
    const fut = futureVowelOf(entry, root);
    if (fut === 'a') V = PATAH;
    if (fut === 'e') V = TSERE;
    p = strong(binyan, V);
    if (gizra === 'quad') p = mapTemplates(p, quadrilateral);
  }
  if (!p) return null;
  if (entry.py && binyan === 'paal') p = entry.py === 'keep' ? peYodPaalKeep(p) : peYodPaal(p);
  else if ((entry.py || root[0].l === 'י') && !entry.pn && ['nifal', 'hifil', 'hufal'].includes(binyan) && gizra !== 'hollow') {
    p = mapTemplates(p, (t) => peYod(t, binyan));
  }
  if (entry.pa && binyan === 'paal') p = peAlefPaal(p);
  if (entry.pn && ['paal', 'nifal', 'hifil', 'hufal'].includes(binyan)) {
    p = mapTemplates(p, (t, tense) => (binyan === 'paal' && tense === 'imperative' ? t : assimilateNun(t)));
  }
  return p;
}

/** Fill one template with a root and apply the phonological rules. */
export function realize(template, entry) {
  const root = parseRoot(entry.root);
  const fut = futureVowelOf(entry, root);
  const ctx = {
    binyan: entry.binyan,
    lastR: root.length,
    c1Type: entry.c1 || (root[0].l === 'א' || fut === 'a' ? 'e' : 'a'),
    c1Silent: entry.c1Silent,
    assimilateN: entry.assimilateN,
  };
  return render(applyRules(parseTemplate(template, root), ctx));
}

/**
 * Conjugate a lexicon verb entry. Returns
 * { past: {slot: {n, p}}, present, future, imperative, infinitive: {n, p} }
 * where n is the vowelled form and p the plain (full) spelling.
 * Explicit forms in entry.forms override generated ones.
 */
export function conjugate(entry) {
  const p = entry.table ? null : paradigmFor(entry);
  const over = entry.forms || entry.table || {};
  const out = {};
  for (const tense of ['past', 'present', 'future', 'imperative']) {
    const tpl = p && p[tense];
    const ov = over[tense];
    if (!tpl && !ov) { out[tense] = null; continue; }
    if (ov === null) { out[tense] = null; continue; }
    out[tense] = {};
    for (const slot of SLOTS[tense]) {
      if (ov && ov[slot] !== undefined) out[tense][slot] = explicitForm(ov[slot]);
      else if (tpl && tpl[slot]) {
        const n = realize(tpl[slot], entry);
        out[tense][slot] = { n, p: toPlain(n) };
      } else out[tense][slot] = null;
    }
  }
  if (over.infinitive !== undefined) out.infinitive = explicitForm(over.infinitive);
  else if (p && p.infinitive) {
    const n = realize(p.infinitive, entry);
    out.infinitive = { n, p: toPlain(n) };
  } else out.infinitive = null;
  return out;
}

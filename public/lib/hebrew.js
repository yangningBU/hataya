// Low-level Hebrew text utilities: nikkud constants, stripping, final letters,
// search normalization, and conversion of vowelled spelling to modern
// "full" spelling (כתיב מלא) following the Academy of the Hebrew Language rules.

export const SHEVA = 'ְ';
export const HATAF_SEGOL = 'ֱ';
export const HATAF_PATAH = 'ֲ';
export const HATAF_QAMATS = 'ֳ';
export const HIRIQ = 'ִ';
export const TSERE = 'ֵ';
export const SEGOL = 'ֶ';
export const PATAH = 'ַ';
export const QAMATS = 'ָ';
export const HOLAM = 'ֹ';
export const QUBUTS = 'ֻ';
export const DAGESH = 'ּ';
export const SHIN_DOT = 'ׁ';
export const SIN_DOT = 'ׂ';
export const QAMATS_QATAN = 'ׇ';

export const VOWELS = new Set([
  SHEVA, HATAF_SEGOL, HATAF_PATAH, HATAF_QAMATS, HIRIQ, TSERE, SEGOL,
  PATAH, QAMATS, HOLAM, QUBUTS, QAMATS_QATAN,
]);
export const HATAFS = new Set([HATAF_SEGOL, HATAF_PATAH, HATAF_QAMATS]);

const FINAL_OF = { 'כ': 'ך', 'מ': 'ם', 'נ': 'ן', 'פ': 'ף', 'צ': 'ץ' };
const REGULAR_OF = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };

const NIKKUD_RE = /[֑-ֽֿׁׂׄ-ׇ]/g;
const LETTER_RE = /[א-ת]/;

export const isLetter = (ch) => LETTER_RE.test(ch);
export const toFinal = (ch) => FINAL_OF[ch] || ch;
export const toRegular = (ch) => REGULAR_OF[ch] || ch;

export function stripNikkud(s) {
  return s.replace(NIKKUD_RE, '');
}

export function hasNikkud(s) {
  return /[ְ-ׇּׁׂ]/.test(s);
}

/** Split a vowelled word into letters, each with the marks that follow it. */
export function splitLetters(word) {
  const out = [];
  for (const ch of word) {
    if (isLetter(ch)) out.push({ l: ch, marks: '' });
    else if (out.length && /[֑-ׇ]/.test(ch)) out[out.length - 1].marks += ch;
    else out.push({ l: ch, marks: '', other: true });
  }
  return out;
}

const vowelOf = (marks) => [...marks].find((m) => VOWELS.has(m)) || '';

function isMaterVav(u) {
  if (!u || u.l !== 'ו') return false;
  const v = vowelOf(u.marks);
  return v === HOLAM || (v === '' && u.marks.includes(DAGESH));
}

/**
 * Convert vowelled spelling to plain full spelling (ktiv male).
 * Vowels written defectively get their mater: holam/qubuts/qamats-qatan -> ו,
 * hiriq in an open syllable (or before a doubled letter) -> י; consonantal ו/י
 * in mid-word are doubled.
 */
export function toPlain(word) {
  const u = splitLetters(word);
  let out = '';
  for (let i = 0; i < u.length; i++) {
    const c = u[i];
    if (c.other) { out += c.l; continue; }
    const prev = u[i - 1];
    const next = u[i + 1];
    const v = vowelOf(c.marks);
    const atStart = i === 0 || prev.other;
    const atEnd = !next || next.other;
    let letter = c.l;

    if (c.l === 'ו' && !atStart && !atEnd && !isMaterVav(c)) {
      // Consonantal vav in the middle of a word is written double,
      // unless a neighbouring letter is already a vav.
      if (prev.l !== 'ו' && next.l !== 'ו') letter = 'וו';
    } else if (c.l === 'י' && !atStart && !atEnd && v && v !== SHEVA && !HATAFS.has(v)) {
      const prevV = vowelOf(prev.marks);
      // Consonantal yod is doubled unless it touches a vowel letter (written or
      // added by ktiv male), forms a diphthong (בַּיִת; but dual -ַיִם is -יים),
      // or comes before a final ה after a non-hiriq vowel (בְּעָיָה, חַיָּה).
      const nextIsLast = !u[i + 2] || u[i + 2].other;
      const dual = next.l === 'ם' && nextIsLast && i >= 2;
      const diphthong = v === HIRIQ && (prevV === PATAH || prevV === QAMATS) && !dual;
      const touchesVav = isMaterVav(prev) || isMaterVav(next) || [QUBUTS, HOLAM, QAMATS_QATAN].includes(prevV) || v === QUBUTS || v === HOLAM;
      const beforeFinalHe = next.l === 'ה' && nextIsLast && prevV !== HIRIQ;
      if (prev.l !== 'י' && next.l !== 'י' && !touchesVav && !diphthong && !beforeFinalHe) letter = 'יי';
    }
    out += letter;

    if (c.l === 'ו' && isMaterVav(c)) continue;
    if (v === HOLAM) {
      const quiescentAlef = next && next.l === 'א' && !vowelOf(next.marks) && u[i + 2] && !u[i + 2].other;
      if (!(next && next.l === 'ו') && !quiescentAlef) out += 'ו';
    } else if (v === QUBUTS) {
      out += 'ו';
    } else if (v === QAMATS_QATAN) {
      // A qamats qatan that replaces a hataf-qamats (הׇעׇבְרָה) gets no vav.
      if (!(prev && vowelOf(prev.marks) === QAMATS_QATAN)) out += 'ו';
    } else if (v === HIRIQ && next && !next.other && next.l !== 'י') {
      const nv = vowelOf(next.marks);
      const doubled = next.marks.includes(DAGESH);
      const nextOpen = (nv && nv !== SHEVA) || (!nv && isMaterVav(u[i + 2]));
      if (doubled || nextOpen) out += 'י';
    }
  }
  return out;
}

/** Normalize text for lookup keys: no nikkud, no final forms, Hebrew letters only. */
export function searchKey(s) {
  return [...stripNikkud(s)].filter(isLetter).map(toRegular).join('');
}

/** Looser key that ignores ו/י (except a leading one) so ktiv male/chaser both match. */
export function looseKey(s) {
  const k = searchKey(s);
  return k.slice(0, 1) + k.slice(1).replace(/[וי]/g, '');
}

export function isHebrew(s) {
  return /[א-ת]/.test(s);
}

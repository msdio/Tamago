import { CONSONANT, FINAL_CONSONANT, VOWEL } from '@/constants/hangul';

export const getConstantVowel = (kor: string) => {
  const ga = 44032;
  let uni = kor.charCodeAt(0);

  uni = uni - ga;

  const fn = parseInt(String(uni / 588));
  const sn = parseInt(String((uni - fn * 588) / 28));
  const tn = parseInt(String(uni % 28));

  return {
    f: CONSONANT[fn],
    s: VOWEL[sn],
    t: FINAL_CONSONANT[tn],
  };
};

export function isHangulChar(word: string) {
  if (!word) return false;

  const c = word.charCodeAt(0);
  if (0x1100 <= c && c <= 0x11ff) return true;
  if (0x3130 <= c && c <= 0x318f) return true;
  if (0xac00 <= c && c <= 0xd7a3) return true;
  return false;
}

export const checkEqualHangul = (word1: string, word2: string) => {
  const { f: f1, s: s1, t: t1 } = getConstantVowel(word1);
  const { f: f2, s: s2, t: t2 } = getConstantVowel(word2);
  const errorWords: Record<string, number> = {};
  if (f1 !== f2) {
    errorWords[f1] = 1;
  }
  if (s1 !== s2) {
    errorWords[s1] = 1;
  }
  if (t1 !== t2) {
    errorWords[t1] = errorWords[t1] ? errorWords[t1] + 1 : 1;
  }

  return errorWords;
};

export const checkEqualEnglish = (word1: string, word2: string) => {
  const errorWords: Record<string, number> = {};
  if (word1 !== word2) {
    errorWords[word1] = 1;
  }

  return errorWords;
};

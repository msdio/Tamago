import { CONSONANT, FINAL_CONSONANT, VOWEL } from '@/constants/hangul';

export function isHangulChar(word: string) {
  if (!word) return false;
  const c = word.charCodeAt(0);
  if (0x1100 <= c && c <= 0x11ff) return true;
  if (0x3130 <= c && c <= 0x318f) return true;
  if (0xac00 <= c && c <= 0xd7a3) return true;

  return false;
}

export function isEnglishChar(word: string) {
  if (!word) return false;
  const c = word.charCodeAt(0);
  if (65 <= c && c <= 90) {
    return true;
  }
  if (97 <= c && c <= 122) {
    return true;
  }

  return false;
}

export const getCharType = (char: string) => {
  if (isHangulChar(char)) {
    return 'hangul';
  }
  if (isEnglishChar(char)) {
    return 'english';
  }
  return 'other';
};

export const getConstantVowel = (char: string) => {
  if (!isHangulChar(char)) {
    return [char];
  }

  const result: string[] = [];
  const ga = 44032;
  let uni = char.charCodeAt(0);
  uni = uni - ga;

  const fn = parseInt(String(uni / 588));
  if (CONSONANT[fn]) {
    result.push(CONSONANT[fn]);
  }
  const sn = parseInt(String((uni - fn * 588) / 28));
  if (VOWEL[sn]) {
    result.push(VOWEL[sn]);
  }
  const tn = parseInt(String(uni % 28));
  if (FINAL_CONSONANT[tn]) {
    result.push(FINAL_CONSONANT[tn]);
  }

  return result;
};

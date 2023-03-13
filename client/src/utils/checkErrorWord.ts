import { CONSONANT, FINAL_CONSONANT, VOWEL } from '@/constants/hangul';

const getConstantVowel = (kor: string) => {
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

const checkEqualHangul = (word1: string, word2: string) => {
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

const checkEqualEnglish = (word1: string, word2: string) => {
  const errorWords: Record<string, number> = {};
  if (word1 !== word2) {
    errorWords[word1] = 1;
  }

  return errorWords;
};

const checkErrorWord = (correctWord: string, inputWord: string) => {
  const isCorrectWordHangul = isHangulChar(correctWord);
  const isInputWordHangul = isHangulChar(inputWord);

  if (isCorrectWordHangul && isInputWordHangul) {
    const currentErrorWords = checkEqualHangul(correctWord, inputWord);
    return currentErrorWords;
  }
  if (!isCorrectWordHangul && !isInputWordHangul) {
    const currentErrorWords = checkEqualEnglish(correctWord, inputWord);
    return currentErrorWords;
  }
  if (isCorrectWordHangul) {
    const currentErrorWords = checkEqualHangul(correctWord, '');
    return currentErrorWords;
  } else {
    const currentErrorWords = checkEqualEnglish(correctWord, '');
    return currentErrorWords;
  }
};

export const getNumberPerChar = (char: string) => {
  const isHangul = isHangulChar(char);
  if (isHangul) {
    const { f: f1, s: s1, t: t1 } = getConstantVowel(char);
    return [f1, s1, t1].filter((v) => v).length;
  }
  // 영어인 경우 1자당 1개
  return 1;
};

export default checkErrorWord;

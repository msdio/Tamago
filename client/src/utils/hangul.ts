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

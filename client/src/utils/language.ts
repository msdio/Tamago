import { LANGUAGE_LIST, PROGRAMMING_LANGUAGE } from '@/constants/language';
import type { LanguageType, ProgrammingLanguageType } from '@/types/language';

export const getRandomLanguage = (): LanguageType => {
  const randomIdx = Math.floor(Math.random() * LANGUAGE_LIST.length);

  return LANGUAGE_LIST[randomIdx];
};

export const getRandomProgrammingLanguage = (): ProgrammingLanguageType => {
  const programmingLanguageList = Object.values(PROGRAMMING_LANGUAGE);
  const randomIdx = Math.floor(Math.random() * programmingLanguageList.length);

  return programmingLanguageList[randomIdx];
};

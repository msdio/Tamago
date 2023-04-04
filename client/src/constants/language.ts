import type { LanguageType, NationLanguageType, ProgrammingLanguageType, SelectLanguageType } from '@/types/language';

export const NATION_LANGUAGE: NationLanguageType[] = ['korean', 'english'];
export const PROGRAMMING_LANGUAGE: ProgrammingLanguageType[] = ['javascript', 'python', 'java'];

export const SELECT_LANGUAGE_LABEL: Record<SelectLanguageType, string> = {
  korean: '한글 타자',
  english: '영문 타자',
  code: '코드 선택',
  random: '진짜 강자들만 선택할 수 있는 랜덤',
};

export const LANGUAGE_LIST: LanguageType[] = [...PROGRAMMING_LANGUAGE, ...NATION_LANGUAGE];

Object.freeze(SELECT_LANGUAGE_LABEL);

export const LONG_TYPING_TYPE: Record<string, string> = {
  KOREAN: '한글',
  ENGLISH: '영어',
  JAVA: 'JAVA',
  PYTHON: '파이썬',
  C: 'C',
};

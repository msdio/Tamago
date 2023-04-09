import type {
  LanguageType,
  NationLanguageType,
  ProgrammingLanguageType,
  SelectLanguageItemType,
  SelectLanguageType,
  SelectProgrammingLanguageItemType,
  SelectProgrammingLanguageType,
} from '@/types/language';
import { getRandomProgrammingLanguage } from '@/utils/language';

export const NATION_LANGUAGE: Record<string, NationLanguageType> = {
  KOREAN: 'KOREAN',
  ENGLISH: 'ENGLISH',
};

export const PROGRAMMING_LANGUAGE: Record<string, ProgrammingLanguageType> = {
  JAVASCRIPT: 'JAVASCRIPT',
  PYTHON: 'PYTHON',
  JAVA: 'JAVA',
  C: 'C',
};

export const LONG_TYPING_TYPE: Record<string, string> = {
  KOREAN: '한글',
  ENGLISH: '영어',
  JAVA: 'Java',
  PYTHON: 'Python',
  JAVASCRIPT: 'JavaScript',
  C: 'C',
};
export const SELECT_LANGUAGE_VALUE: Record<string, SelectLanguageType> = {
  KOREAN: 'KOREAN',
  ENGLISH: 'ENGLISH',
  CODE: 'CODE',
  RANDOM: 'RANDOM',
};

export const SELECT_LANGUAGE: Record<SelectLanguageType, SelectLanguageItemType> = {
  RANDOM: {
    value: SELECT_LANGUAGE_VALUE.RANDOM,
    label: '진짜 강자들만 선택할 수 있는 랜덤',
  },
  KOREAN: {
    value: SELECT_LANGUAGE_VALUE.KOREAN,
    label: '한글 타자',
  },
  ENGLISH: {
    value: SELECT_LANGUAGE_VALUE.ENGLISH,
    label: '영어 타자',
  },
  CODE: {
    value: SELECT_LANGUAGE_VALUE.CODE,
    label: '코드 선택',
  },
};

export const LANGUAGE_LIST: LanguageType[] = [
  ...Object.values(PROGRAMMING_LANGUAGE),
  ...Object.values(NATION_LANGUAGE),
];

export const SELECT_PROGRAMMING_LANGUAGE_VALUE: Record<string, SelectProgrammingLanguageType> = {
  JAVASCRIPT: 'JAVASCRIPT',
  PYTHON: 'PYTHON',
  JAVA: 'JAVA',
  C: 'C',
  RANDOM: getRandomProgrammingLanguage(),
};

export const SELECT_PROGRAMMING_LANGUAGE: Record<SelectProgrammingLanguageType, SelectProgrammingLanguageItemType> = {
  RANDOM: {
    value: SELECT_PROGRAMMING_LANGUAGE_VALUE.RANDOM,
    label: 'Random Code',
  },
  JAVA: {
    value: SELECT_PROGRAMMING_LANGUAGE_VALUE.JAVA,
    label: 'Java',
  },
  PYTHON: {
    value: SELECT_PROGRAMMING_LANGUAGE_VALUE.PYTHON,
    label: 'Python',
  },
  JAVASCRIPT: {
    value: SELECT_PROGRAMMING_LANGUAGE_VALUE.JAVASCRIPT,
    label: 'Javascript',
  },
  C: {
    value: SELECT_PROGRAMMING_LANGUAGE_VALUE.C,
    label: 'C',
  },
};

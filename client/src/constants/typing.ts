import type { ContentType, TypingMode } from '@/types/typing';

// NOTE : enum?
export const CONTENT_TYPE: Record<'LONG' | 'SHORT', ContentType> = {
  LONG: true,
  SHORT: false,
};

export const TYPING_MODE: Record<TypingMode, TypingMode> = {
  PRACTICE: 'PRACTICE',
  ACTUAL: 'ACTUAL',
};

export const ACTUAL_TYPING_TIME_LIMIT = {
  LONG: 5 * 60 * 1000,
  SHORT: 5 * 60 * 1000,
};

// Language Type으로 옮기는게 어떨까요?!
export const TYPING_TYPE: Record<string, string> = {
  KOREAN: '한글',
  ENGLISH: '영어',
  JAVA: 'Java',
  PYTHON: 'Python',
  C: 'C',
  JAVASCRIPT: 'JavaScript',
};

export enum TYPING_STATE {
  'DEFAULT' = 'd',
  'CORRECT' = 'c',
  'INCORRECT' = 'i',
  'FOCUS' = 'f',
  'EMPTY' = '',
}

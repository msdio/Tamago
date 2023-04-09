import type { ContentType, TypingMode } from '@/types/typing';

// NOTE : enum?
export const CONTENT_TYPE: Record<string, ContentType> = {
  LONG: true,
  SHORT: false,
};

// NOTE : 왜 actual인가요?
export const TYPING_MODE: Record<string, TypingMode> = {
  PRACTICE: 'PRACTICE',
  ACTUAL: 'ACTUAL',
};

// 실전 모드 시간 제한
export const EXAM_TIMER = {
  LONG: 4 * 60 * 1000,
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

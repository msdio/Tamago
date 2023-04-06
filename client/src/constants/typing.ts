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

// Language Type으로 옮기는게 어떨까요?!
const TYPING_TYPE: Record<string, string> = {
  KOREAN: '한글',
  ENGLISH: '영어',
  JAVA: 'Java',
  PYTHON: 'Python',
  C: 'C',
  JAVASCRIPT: 'JavaScript',
};

export { TYPING_TYPE };

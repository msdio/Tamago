import type { ContentType } from '@/types/typing';

// NOTE : enum?
export const CONTENT_TYPE: Record<ContentType, ContentType> = {
  LONG: 'LONG',
  SHORT: 'SHORT',
};

// Language Type으로 옮기는게 어떨까요?!
const TYPING_TYPE: Record<string, string> = {
  KOREAN: '한글',
  ENGLISH: '영어',
  JAVA: 'JAVA',
  PYTHON: '파이썬',
  C: 'C',
};

export { TYPING_TYPE };

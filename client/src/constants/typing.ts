import type { ContentType } from '@/types/typing';

// NOTE : enum?
export const CONTENT_TYPE: Record<ContentType, ContentType> = {
  LONG: 'LONG',
  SHORT: 'SHORT',
};

const TYPING_TYPE: Record<string, string> = {
  KOREAN: '한글',
  ENGLISH: '영어',
  JAVA: 'JAVA',
  PYTHON: '파이썬',
  C: 'C',
};

export { TYPING_TYPE };

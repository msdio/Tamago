
import type { ContentType } from '@/types/typing';

export const CONTENT_TYPE: Record<ContentType, string> = {
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

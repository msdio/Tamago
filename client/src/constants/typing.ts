import type { ContentType } from '@/types/typing';

// NOTE : enum?
export const CONTENT_TYPE: Record<ContentType, ContentType> = {
  LONG: 'LONG',
  SHORT: 'SHORT',
};

// 실전 모드 시간 제한
export const EXAM_TIMER = {
  LONG: 4 * 60 * 1000,
};

export enum TYPING_STATE {
  'DEFAULT' = 'd',
  'CORRECT' = 'c',
  'INCORRECT' = 'i',
  'FOCUS' = 'f',
  'EMPTY' = '',
}

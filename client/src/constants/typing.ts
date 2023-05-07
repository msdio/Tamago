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

export enum TYPING_STATE {
  'DEFAULT' = 'd',
  'CORRECT' = 'c',
  'INCORRECT' = 'i',
  'FOCUS' = 'f',
  'EMPTY' = '',
}

export interface CharInfo {
  char: string;
  type: string;
  components: string[];
}

export type TypingMode = 'PRACTICE' | 'ACTUAL';
export type ContentType = 'LONG' | 'SHORT';

export enum TypingState {
  'DEFAULT' = 'd',
  'CORRECT' = 'c',
  'INCORRECT' = 'i',
  'FOCUS' = 'f',
  'EMPTY' = '',
}

export interface LongTypingItem {
  language: 'ENGLISH' | 'KOREAN' | 'JAVA' | string;
  thumbnail: string;
  title: string;
  totalPage: number;
  typingId: number;
  viewCount: number;
}

export interface LongTypingDetail {
  content: string;
  currentPage: number;
  language: string;
  title: string;
  totalPage: number;
  typingId: number;
}

// TODO : TypingResultType 중복 코드 제거
export interface TypingResultType {
  typingTime: number;
  typingAccuracy: number;
  typingWpm: number;
  typingSpeed: number;
}

export interface TypingHistoryType extends TypingResultType {
  content: string;
  endTime: Date;
}

export const INIT_TYPING_RESULT = {
  typingSpeed: 0,
  typingAccuracy: 0,
  typingWpm: 0,
  typingTime: 0,
};

Object.freeze(INIT_TYPING_RESULT);

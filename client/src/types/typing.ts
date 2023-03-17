export interface CharInfo {
  char: string;
  type: string;
  components: string[];
}

export type TypingMode = 'PRACTICE' | 'ACTUAL';

export enum TypingState {
  'DEFAULT' = 'd',
  'CORRECT' = 'c',
  'INCORRECT' = 'i',
  'FOCUS' = 'f',
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

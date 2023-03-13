export interface CharInfo {
  char: string;
  type: string;
  components: string[];
}

/**
 * f: focus
 * c: correct
 * i: incorrect
 * d: default
 * 타입이 한 문자인 이유는 타이핑한 문자와 대응시키기 위해서 입니다.
 */
export type TypingState = 'f' | 'c' | 'i' | 'd';

export interface LongTypingItem {
  language: string;
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

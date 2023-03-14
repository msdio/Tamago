import request from '@/apis';
import type { LongTypingItem } from '@/types/typing';

export interface ShortTypingType {
  typingId: string;
  content: string;
}

export interface ShortTypingResponseType {
  contentType: '0' | '1';
  typingsType: 'practice';
  typingWritings: ShortTypingType[];
}

interface LongTypingListResponseType {
  code: number;
  description: string;
  result: [LongTypingItem];
}

export const getShortTypingWritingsAPI = async (): Promise<ShortTypingResponseType> => {
  const res = await request.get('/typing/short-typing?language=korean');

  return res.data;
};

export const getLongTypingWritingsAPI = async (): Promise<LongTypingListResponseType> => {
  const res = await request.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/typing/long`);

  return res.data;
};

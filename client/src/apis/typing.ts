import request, { authenticationRequest } from '@/apis';
import type { LongTypingItem } from '@/types/typing';
import type { TypingMode } from '@/types/typing';

export interface ShortTypingType {
  typingId: string;
  content: string;
}

export interface ShortTypingResultType {
  contentType: '0' | '1';
  typingsType: 'practice';
  typingWritings: ShortTypingType[];
}

interface LongTypingListResultType {
  code: number;
  description: string;
  result: [LongTypingItem];
}

export const getShortTypingWritingsAPI = async (
  language: 'korean' | 'english',
): Promise<{
  result: ShortTypingResultType;
}> => {
  const res = await request.get(`/typing/short?language=${language}`);

  return res.data;
};

export const getLongTypingWritingsAPI = async (): Promise<LongTypingListResultType> => {
  const res = await request.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/typing/long`);

  return res.data;
};

type WrongKeyType = Record<string, { total: number; count: number }>;

interface TypingHistoryRequest {
  typingId: string;
  resultContent: string;
  startTime: Date;
  endTime: Date;
  typingSpeed: number;
  mode: TypingMode | string;
  wpm: number;
  typingAccuracy: number;
  wrongKeys: Record<string, { total: number; count: number }>;
}

export const getTypingHistoryAPI = async (typingHistory: TypingHistoryRequest) => {
  console.log('서버에 전송할 데이터', typingHistory);
  const res = await authenticationRequest.post('/typing/history', typingHistory);
  console.log('res: ', res);

  return res.data;
};

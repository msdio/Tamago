import { requestWithoutAuth } from '@/apis';
import type { LongTypingDetail, LongTypingItem } from '@/types/typing';
import type { TypingMode } from '@/types/typing';

export interface ShortTypingType {
  typingId: string;
  content: string;
}

export interface ShortTypingResultType {
  contentType: '0' | '1';
  typingsType: 'practice';
  // TODO: backend와 상의하기 ->  originalTyping: string;
  typingWritings: ShortTypingType[];
}

export interface LongTypingListResultType {
  code: number;
  description: string;
  result: [LongTypingItem];
}

export interface LongTypingResultType {
  code: number;
  description: string;
  result: LongTypingDetail;
}

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

export const getShortTypingWritingsAPI = async (
  language: 'korean' | 'english',
): Promise<{
  result: ShortTypingResultType;
}> => {
  const res = await requestWithoutAuth.get(`/typing/short?language=${language}`);

  return res.data;
};

export const getLongTypingListAPI = async (): Promise<LongTypingListResultType> => {
  const res = await requestWithoutAuth.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/typing/long`);

  return res.data;
};

export const getLongTypingAPI = async ({
  typingId,
  pageNum,
}: {
  typingId: string;
  pageNum: string;
}): Promise<LongTypingResultType> => {
  const res = await requestWithoutAuth.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/typing/long/detail?longTypingId=${typingId}&page=${pageNum}`,
  );

  return res.data;
};

export const getTypingHistoryAPI = async (typingHistory: TypingHistoryRequest) => {
  console.log('서버에 전송할 데이터', typingHistory);
  // const res = await authenticationRequest.post('/typing/history', typingHistory);
  // console.log('res: ', res);
  return true;
  // return res.data;
};

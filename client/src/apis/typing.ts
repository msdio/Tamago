import { requestWithAuth, requestWithoutAuth } from '@/apis';
import type { LongTypingDetail, LongTypingItem } from '@/types/typing';
import type { TypingMode } from '@/types/typing';

export interface ShortTypingType {
  typingId: number;
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

export interface TypingHistoryRequest {
  contentType: boolean;
  typingId: number;
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
  const res = await requestWithoutAuth.get(`/typing/long`);

  return res.data;
};

export const getLongTypingAPI = async ({
  typingId,
  pageNum,
}: {
  typingId: string;
  pageNum: string;
}): Promise<LongTypingResultType> => {
  const res = await requestWithoutAuth.get(`/typing/long/detail?longTypingId=${typingId}&page=${pageNum}`);

  return res.data;
};

// TODO : 로그인을 하지않은 상태에서는 타이핑 기록 API를 호출하지 않는다?
export const getTypingHistoryAPI = async (typingHistory: TypingHistoryRequest) => {
  const res = await requestWithAuth.post('/typing/history', typingHistory);
  return res.data.code;
};

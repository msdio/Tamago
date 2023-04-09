import { requestWithAuth, requestWithoutAuth } from '@/apis';
import type { ApiResponse } from '@/types/apiResponse';
import type { LanguageType } from '@/types/language';
import type { TierLevels } from '@/types/tier';
import type { LongTypingDetail, LongTypingItem } from '@/types/typing';
import type { TypingMode } from '@/types/typing';
import { getTierLevel } from '@/utils/tier';

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
  result: {
    totalPage: number;
    longTypings: LongTypingItem[];
  };
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
  page?: number;
}

export type TypingLanguageType = 'korean' | 'english' | 'java' | 'javascript' | 'python';
export const getShortTypingWritingsAPI = async (
  language: TypingLanguageType,
): Promise<{
  result: ShortTypingResultType;
}> => {
  const res = await requestWithoutAuth.get(`/typing/short?language=${language}`);

  return res.data;
};

export const getLongTypingListAPI = async (page: number): Promise<LongTypingListResultType> => {
  const res = await requestWithoutAuth.get(`/typing/long?page=${page}`);

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

export const getTypingHistoryAPI = async (typingHistory: TypingHistoryRequest) => {
  // NOTE : 로그인이 되어있는지 여부는 accessToken이 localStorage에 있는지 여부로 판단한다. vs recoil user 정보로 판단한다.
  const accessToken = localStorage.getItem('accessToken');

  // NOTE : 로그인을 하지않은 상태에서는 타이핑 기록 API를 호출하지 않는다
  // TODO : 연습모드인 경우에만, 실전 모드에서는 로그인시 어떻게 할것인지 고민해보기
  if (accessToken === null) {
    return;
  }

  const res = await requestWithAuth.post('/typing/history', typingHistory);
  return res.data.code;
};

interface RegisterLongTextProps {
  title: string;
  content: string;
  language: LanguageType;
}
export const postRegisterLongTextAPI = async (data: RegisterLongTextProps): Promise<ApiResponse> => {
  const res = await requestWithAuth.post('/typing/register', data);

  return res.data;
};

export const getTierInfoAPI = async (): Promise<{
  tier: TierLevels;
  prevScore: number;
  afterScore: number;
}> => {
  const prevScore = 900;
  const afterScore = 1000;

  const tier = getTierLevel(afterScore);

  return {
    tier,
    prevScore,
    afterScore,
  };
};

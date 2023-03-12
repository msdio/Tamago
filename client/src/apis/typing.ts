import request from '@/apis';

export interface ShortTypingType {
  typingId: string;
  content: string;
}

export interface ShortTypingResultType {
  contentType: '0' | '1';
  typingsType: 'practice';
  typingWritings: ShortTypingType[];
}

export const getShortTypingWritingsAPI = async (
  language: 'korean' | 'english',
): Promise<{
  result: ShortTypingResultType;
}> => {
  const res = await request.get(`/typing/short?language=${language}`);

  return res.data;
};

type WrongKeyType = Record<string, { total: number; count: number }>;

export interface TypingHistoryRequest {
  typingId: string;
  contentType: 1 | 0; // 1: 긴글?, 0: 짧은 글
  contentLength: number; // 타이핑한 짧은 글 글자 길이 = 총글자수
  pageInfo: 1 | null; // 짧은 글일 경우 NULL
  elapsedTime: number; // 초 단위!
  endTime: Date;
  language: 'Korean'; // 언어 종류
  content: string;
  typingMode: 'practice';
  typingSpeed: number;
  typingAccuracy: number;
  wrongKeys: WrongKeyType[];
  resultContent: string;
}

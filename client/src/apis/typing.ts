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

interface TypingHistoryRequest {
  typingId: string;
  resultContent: string;
  startTime: Date;
  endTime: Date;
  typingSpeed: number;
  mode: 'PRACTICE' | 'ACTUAL' | string;
  typingAccuracy: number;
  wrongKeys: Record<string, { total: number; count: number }>[];
}

export const getTypingHistoryAPI = async (typingHistory: TypingHistoryRequest) => {
  // const res = await request.post('/typing/history', typingHistory);
  console.log('서버에 전송할 데이터', typingHistory);

  // return res.data;
};

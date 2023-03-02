import request from '@/apis';

export interface ShortTypingType {
  typingId: string;
  content: string;
}

interface ShortTypingResponse {
  contentType: '0' | '1';
  typingsType: 'practice';
  typingWritings: ShortTypingType[];
}

export const getShortTypingWritingsAPI = async (): Promise<ShortTypingResponse> => {
  const res = await request.get('/typing/short-typing?language=korean');

  return res.data;
};

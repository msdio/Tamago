import request from '@/apis';

export interface ShortTypingType {
  typingId: string;
  content: string;
}

const SHORT_DUMMY = {
  contentType: '0', // 1: 긴글?, 0: 짧은 글
  typingsType: 'practice',
  typingWritings: [
    {
      typingId: '10',
      content: '가는 말이 고와야 오는 말도 곱다',
    },
    {
      typingId: '21',
      content: '소 잃고 외양간 고치기',
    },
    {
      typingId: '13',
      content: '소 같이 일한다',
    },
    {
      typingId: '22',
      content: '닭 소 보듯 소 닭 보듯',
    },
    {
      typingId: '50',
      content: '소 귀에 경 읽기',
    },
  ],
};

export const getShortTypingWritingsAPI = async (): Promise<ShortTypingType[]> => {
  const res = await request.get('/typing/short-typing');

  return res.data.typingWritings;
};

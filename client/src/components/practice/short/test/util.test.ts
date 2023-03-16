import { getTypingCount, getWrongLength } from '@/components/practice/short/utils';

test('잘못된 입력 개수 확인', () => {
  const answerList = [
    {
      originalTyping: '안녕하',
      userTyping: '안녕하',
    },
    {
      originalTyping: '안녕하',
      userTyping: '안녕아',
    },
    {
      originalTyping: '안녕하세요.',
      userTyping: '테스트입니다',
    },
  ];
  const expectedValues = [0, 1, 6];

  answerList.forEach((answer, idx) => {
    const expectedValue = expectedValues[idx];
    const result = getWrongLength(answer);
    expect(expectedValue).toBe(result);
  });
});

test('typing count 개수 확인', () => {
  const answerList = [
    {
      originalTyping: '안녕하',
      userTyping: '안녕하',
    },
    {
      originalTyping: '안녕하',
      userTyping: '안녕아',
    },
    {
      originalTyping: '안녕하세요.',
      userTyping: '테스트입니다',
    },
  ];
  const expectedValues = [8, 6, 0];

  answerList.forEach((answer, idx) => {
    const expectedValue = expectedValues[idx];
    const result = getTypingCount(answer);
    expect(expectedValue).toBe(result);
  });
});

export {};

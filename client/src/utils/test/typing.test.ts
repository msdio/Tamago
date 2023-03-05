import type { CharInfo } from '@/types/typing';

import { getTypingAccuracy, getTypingWpm } from '../typing';

test('타자 정확도 계산', () => {
  expect(getTypingAccuracy('cciif')).toBe(50);
  expect(getTypingAccuracy('f')).toBe(0);
  expect(getTypingAccuracy('cccccccccccccccf')).toBe(100);
  expect(getTypingAccuracy('iiiiiiiiiiiiiiif')).toBe(0);
  expect(getTypingAccuracy('cciicicuf')).toBe(50);
});

test('wpm 계산', () => {
  const typingInfo: CharInfo[] = [
    {
      char: 'a',
      type: 'english',
      components: ['a'],
    },
    {
      char: 'b',
      type: 'english',
      components: ['b'],
    },
    {
      char: '가',
      type: 'hangul',
      components: ['ㄱ', 'ㅏ'],
    },
    {
      char: '',
      type: 'english',
      components: ['b'],
    },
    {
      char: '',
      type: 'other',
      components: [],
    },
    {
      char: '',
      type: 'other',
      components: [],
    },
  ];

  // 1 / 60 분 === 1초
  expect(getTypingWpm(typingInfo, 'cccf', 1 / 60)).toBe(48);
});

export {};

import { getTypingAccuracy, getTypingSpeed, getTypingWpm } from '../typing';

test('타자 정확도 계산', () => {
  expect(getTypingAccuracy('cciif')).toBe(50);
  expect(getTypingAccuracy('f')).toBe(0);
  expect(getTypingAccuracy('cccccccccccccccf')).toBe(100);
  expect(getTypingAccuracy('iiiiiiiiiiiiiiif')).toBe(0);
  expect(getTypingAccuracy('cciicicuf')).toBe(50);
});

test('wpm 계산', () => {
  expect(getTypingWpm({ typingCount: 10, minute: 1 / 60 })).toBe(120);
});

test('타속 계산', () => {
  expect(getTypingSpeed({ typingCount: 10, minute: 1 / 60 })).toBe(600);
});

export {};

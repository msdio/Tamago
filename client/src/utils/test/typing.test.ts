import { getTypingAccuracy } from '../typing';

test('타자 정확도 계산', () => {
  expect(getTypingAccuracy('cciif')).toBe(50);
  expect(getTypingAccuracy('f')).toBe(0);
  expect(getTypingAccuracy('cccccccccccccccf')).toBe(100);
  expect(getTypingAccuracy('iiiiiiiiiiiiiiif')).toBe(0);
  expect(getTypingAccuracy('cciicicuf')).toBe(50);
});

export {};

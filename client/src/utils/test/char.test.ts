import { isEnglishChar, isHangulChar } from '../char';

test('한글 확인', () => {
  expect(isHangulChar('ㄱ')).toBe(true);
  expect(isHangulChar('ㅏ')).toBe(true);
  expect(isHangulChar('가')).toBe(true);
  expect(isHangulChar('닭')).toBe(true);
  expect(isHangulChar('a')).toBe(false);
  expect(isHangulChar('b')).toBe(false);
  expect(isHangulChar('c')).toBe(false);
  expect(isHangulChar('A')).toBe(false);
  expect(isHangulChar('B')).toBe(false);
  expect(isHangulChar('C')).toBe(false);
  expect(isHangulChar('!')).toBe(false);
  expect(isHangulChar('?')).toBe(false);
});

test('영어 확인', () => {
  expect(isEnglishChar('ㄱ')).toBe(false);
  expect(isEnglishChar('ㅏ')).toBe(false);
  expect(isEnglishChar('가')).toBe(false);
  expect(isEnglishChar('닭')).toBe(false);
  expect(isEnglishChar('a')).toBe(true);
  expect(isEnglishChar('b')).toBe(true);
  expect(isEnglishChar('c')).toBe(true);
  expect(isEnglishChar('A')).toBe(true);
  expect(isEnglishChar('B')).toBe(true);
  expect(isEnglishChar('C')).toBe(true);
  expect(isEnglishChar('!')).toBe(false);
  expect(isEnglishChar('?')).toBe(false);
});

export {};

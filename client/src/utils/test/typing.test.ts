import { getTypingAccuracy, getWrongKeys } from '../typing';

test('타자 정확도 계산', () => {
  expect(getTypingAccuracy('cciif')).toBe(50);
  expect(getTypingAccuracy('f')).toBe(0);
  expect(getTypingAccuracy('cccccccccccccccf')).toBe(100);
  expect(getTypingAccuracy('iiiiiiiiiiiiiiif')).toBe(0);
  expect(getTypingAccuracy('cciicicuf')).toBe(50);
});

test('틀린 문자 추출', () => {
  const contentInfos = [
    { char: '동', type: 'hangul', components: ['ㄷ', 'ㅗ', 'ㅇ'] },
    { char: '해', type: 'hangul', components: ['ㅎ', 'ㅐ'] },
    { char: '물', type: 'hangul', components: ['ㅁ', 'ㅜ', 'ㄹ'] },
    { char: '과', type: 'hangul', components: ['ㄱ', 'ㅗ', 'ㅏ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '백', type: 'hangul', components: ['ㅂ', 'ㅐ', 'ㄱ'] },
    { char: '두', type: 'hangul', components: ['ㄷ', 'ㅜ'] },
    { char: '산', type: 'hangul', components: ['ㅅ', 'ㅏ', 'ㄴ'] },
    { char: '이', type: 'hangul', components: ['ㅇ', 'ㅣ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '마', type: 'hangul', components: ['ㅁ', 'ㅏ'] },
    { char: '르', type: 'hangul', components: ['ㄹ', 'ㅡ'] },
    { char: '고', type: 'hangul', components: ['ㄱ', 'ㅗ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '닳', type: 'hangul', components: ['ㄷ', 'ㅏ', 'ㄹ', 'ㅎ'] },
    { char: '도', type: 'hangul', components: ['ㄷ', 'ㅗ'] },
    { char: '록', type: 'hangul', components: ['ㄹ', 'ㅗ', 'ㄱ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '하', type: 'hangul', components: ['ㅎ', 'ㅏ'] },
    { char: '느', type: 'hangul', components: ['ㄴ', 'ㅡ'] },
    { char: '님', type: 'hangul', components: ['ㄴ', 'ㅣ', 'ㅁ'] },
    { char: '이', type: 'hangul', components: ['ㅇ', 'ㅣ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '보', type: 'hangul', components: ['ㅂ', 'ㅗ'] },
    { char: '우', type: 'hangul', components: ['ㅇ', 'ㅜ'] },
    { char: '하', type: 'hangul', components: ['ㅎ', 'ㅏ'] },
    { char: '사', type: 'hangul', components: ['ㅅ', 'ㅏ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '우', type: 'hangul', components: ['ㅇ', 'ㅜ'] },
    { char: '리', type: 'hangul', components: ['ㄹ', 'ㅣ'] },
    { char: '나', type: 'hangul', components: ['ㄴ', 'ㅏ'] },
    { char: '라', type: 'hangul', components: ['ㄹ', 'ㅏ'] },
    { char: '만', type: 'hangul', components: ['ㅁ', 'ㅏ', 'ㄴ'] },
    { char: '세', type: 'hangul', components: ['ㅅ', 'ㅔ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '무', type: 'hangul', components: ['ㅁ', 'ㅜ'] },
    { char: '궁', type: 'hangul', components: ['ㄱ', 'ㅜ', 'ㅇ'] },
    { char: '화', type: 'hangul', components: ['ㅎ', 'ㅗ', 'ㅏ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '삼', type: 'hangul', components: ['ㅅ', 'ㅏ', 'ㅁ'] },
    { char: '천', type: 'hangul', components: ['ㅊ', 'ㅓ', 'ㄴ'] },
    { char: '리', type: 'hangul', components: ['ㄹ', 'ㅣ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '화', type: 'hangul', components: ['ㅎ', 'ㅗ', 'ㅏ'] },
    { char: '려', type: 'hangul', components: ['ㄹ', 'ㅕ'] },
    { char: '강', type: 'hangul', components: ['ㄱ', 'ㅏ', 'ㅇ'] },
    { char: '산', type: 'hangul', components: ['ㅅ', 'ㅏ', 'ㄴ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '대', type: 'hangul', components: ['ㄷ', 'ㅐ'] },
    { char: '한', type: 'hangul', components: ['ㅎ', 'ㅏ', 'ㄴ'] },
    { char: '사', type: 'hangul', components: ['ㅅ', 'ㅏ'] },
    { char: '람', type: 'hangul', components: ['ㄹ', 'ㅏ', 'ㅁ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '대', type: 'hangul', components: ['ㄷ', 'ㅐ'] },
    { char: '한', type: 'hangul', components: ['ㅎ', 'ㅏ', 'ㄴ'] },
    { char: '으', type: 'hangul', components: ['ㅇ', 'ㅡ'] },
    { char: '로', type: 'hangul', components: ['ㄹ', 'ㅗ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '길', type: 'hangul', components: ['ㄱ', 'ㅣ', 'ㄹ'] },
    { char: '이', type: 'hangul', components: ['ㅇ', 'ㅣ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '보', type: 'hangul', components: ['ㅂ', 'ㅗ'] },
    { char: '전', type: 'hangul', components: ['ㅈ', 'ㅓ', 'ㄴ'] },
    { char: '하', type: 'hangul', components: ['ㅎ', 'ㅏ'] },
    { char: '세', type: 'hangul', components: ['ㅅ', 'ㅔ'] },
  ];
  const typingInfos = [
    { char: '동', type: 'hangul', components: ['ㄷ', 'ㅗ', 'ㅇ'] },
    { char: '해', type: 'hangul', components: ['ㅎ', 'ㅐ'] },
    { char: '물', type: 'hangul', components: ['ㅁ', 'ㅜ', 'ㄹ'] },
    { char: '과', type: 'hangul', components: ['ㄱ', 'ㅗ', 'ㅏ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '백', type: 'hangul', components: ['ㅂ', 'ㅐ', 'ㄱ'] },
    { char: '두', type: 'hangul', components: ['ㄷ', 'ㅜ'] },
    { char: '산', type: 'hangul', components: ['ㅅ', 'ㅏ', 'ㄴ'] },
    { char: '이', type: 'hangul', components: ['ㅇ', 'ㅣ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '마', type: 'hangul', components: ['ㅁ', 'ㅏ'] },
    { char: '르', type: 'hangul', components: ['ㄹ', 'ㅡ'] },
    { char: '고', type: 'hangul', components: ['ㄱ', 'ㅗ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '닳', type: 'hangul', components: ['ㄷ', 'ㅏ', 'ㄹ', 'ㅎ'] },
    { char: '도', type: 'hangul', components: ['ㄷ', 'ㅗ'] },
    { char: '록', type: 'hangul', components: ['ㄹ', 'ㅗ', 'ㄱ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '하', type: 'hangul', components: ['ㅎ', 'ㅏ'] },
    { char: '느', type: 'hangul', components: ['ㄴ', 'ㅡ'] },
    { char: '님', type: 'hangul', components: ['ㄴ', 'ㅣ', 'ㅁ'] },
    { char: '이', type: 'hangul', components: ['ㅇ', 'ㅣ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '보', type: 'hangul', components: ['ㅂ', 'ㅗ'] },
    { char: '우', type: 'hangul', components: ['ㅇ', 'ㅜ'] },
    { char: '하', type: 'hangul', components: ['ㅎ', 'ㅏ'] },
    { char: '사', type: 'hangul', components: ['ㅅ', 'ㅏ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '우', type: 'hangul', components: ['ㅇ', 'ㅜ'] },
    { char: '리', type: 'hangul', components: ['ㄹ', 'ㅣ'] },
    { char: '나', type: 'hangul', components: ['ㄴ', 'ㅏ'] },
    { char: '라', type: 'hangul', components: ['ㄹ', 'ㅏ'] },
    { char: '만', type: 'hangul', components: ['ㅁ', 'ㅏ', 'ㄴ'] },
    { char: '세', type: 'hangul', components: ['ㅅ', 'ㅔ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '무', type: 'hangul', components: ['ㅁ', 'ㅜ'] },
    { char: '궁', type: 'hangul', components: ['ㄱ', 'ㅜ', 'ㅇ'] },
    { char: '화', type: 'hangul', components: ['ㅎ', 'ㅗ', 'ㅏ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '삼', type: 'hangul', components: ['ㅅ', 'ㅏ', 'ㅁ'] },
    { char: '천', type: 'hangul', components: ['ㅊ', 'ㅓ', 'ㄴ'] },
    { char: '리', type: 'hangul', components: ['ㄹ', 'ㅣ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '화', type: 'hangul', components: ['ㅎ', 'ㅗ', 'ㅏ'] },
    { char: '려', type: 'hangul', components: ['ㄹ', 'ㅕ'] },
    { char: '강', type: 'hangul', components: ['ㄱ', 'ㅏ', 'ㅇ'] },
    { char: '산', type: 'hangul', components: ['ㅅ', 'ㅏ', 'ㄴ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '대', type: 'hangul', components: ['ㄷ', 'ㅐ'] },
    { char: '한', type: 'hangul', components: ['ㅎ', 'ㅏ', 'ㄴ'] },
    { char: '사', type: 'hangul', components: ['ㅅ', 'ㅏ'] },
    { char: '람', type: 'hangul', components: ['ㄹ', 'ㅏ', 'ㅁ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '대', type: 'hangul', components: ['ㄷ', 'ㅐ'] },
    { char: '한', type: 'hangul', components: ['ㅎ', 'ㅏ', 'ㄴ'] },
    { char: '으', type: 'hangul', components: ['ㅇ', 'ㅡ'] },
    { char: '로', type: 'hangul', components: ['ㄹ', 'ㅗ'] },
    { char: ' ', type: 'other', components: [' '] },
    { char: '길', type: 'hangul', components: ['ㄱ', 'ㅣ', 'ㄹ'] },
    { char: '이', type: 'hangul', components: ['ㅇ', 'ㅣ'] },
    { char: '\n', type: 'other', components: ['\n'] },
    { char: '\n', type: 'other', components: ['\n'] },
    { char: '\n', type: 'other', components: ['\n'] },
    { char: '\n', type: 'other', components: ['\n'] },
    { char: '\n', type: 'other', components: ['\n'] },
  ];
  expect(getWrongKeys(contentInfos, typingInfos)).toEqual({
    'ㅗ': { total: 10, count: 1 },
    'ㅎ': { total: 9, count: 1 },
    'ㅏ': { total: 20, count: 1 },
    ' ': { total: 13, count: 1 },
    'ㅂ': { total: 3, count: 1 },
    'ㅅ': { total: 7, count: 1 },
    'ㄴ': { total: 10, count: 1 },
    'ㅔ': { total: 2, count: 1 },
    'ㅓ': { total: 2, count: 1 },
    'ㅈ': { total: 1, count: 1 },
  });
});

export {};

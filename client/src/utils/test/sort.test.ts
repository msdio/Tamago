import { sortObjectByKeys } from '../sort';

test('sort object by key', () => {
  const testData = {
    ㅓ: 0,
    ㅗ: 0,
    ㅛ: 0,
    a: 0.279971413257102,
    ㅡ: 0.5,
    b: 0.28341754708314193,
    c: 0.2469733656174334,
    d: 0.3031403158467961,
    ㄴ: 0.5,
  };

  const orderedData = {
    a: 0.279971413257102,
    b: 0.28341754708314193,
    c: 0.2469733656174334,
    d: 0.3031403158467961,
    ㄴ: 0.5,
    ㅓ: 0,
    ㅗ: 0,
    ㅛ: 0,
    ㅡ: 0.5,
  };

  const testSort = sortObjectByKeys(testData);
  expect(testSort).toStrictEqual(orderedData);
});

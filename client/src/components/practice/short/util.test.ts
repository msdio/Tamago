import { getWrongLength } from './utils';

test('count wrong inputs', () => {
  const original = 'Typing master go';

  const countWrong = getWrongLength({ originalTyping: original, userTyping: 'Typing astgo' });

  expect(countWrong).toBe(5);
});

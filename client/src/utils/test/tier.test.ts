import { getTierLevel } from '../tier';

test('tier level is 3 when score is 790', () => {
  const score = 790;
  const tier = getTierLevel(score);

  expect(tier).toBe(3);
});

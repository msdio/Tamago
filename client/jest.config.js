module.exports = {
  testMatch: ['**/test/**/*.test.ts'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

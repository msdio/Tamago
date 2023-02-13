// import theme from '../src/styles/theme';
// import Button from '../src/styles/Button';
// const theme = require('../src/styles/theme');

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

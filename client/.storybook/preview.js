import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Design System', 'Components', ['common', 'login', 'signup']],
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

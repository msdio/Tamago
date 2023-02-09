import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';

const theme = extendTheme({
  colors: {
    tamago: {
      100: '#fffaf8', // hover 등
      200: '#ff7a29',
      300: '#ff701e',
      400: '#ff6611',
      500: '#FF8A65', // basic color
      600: '#f35200',
      700: '#e74800',
      800: '#dc3d00',
      900: '#d23400',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

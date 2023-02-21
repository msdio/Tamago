import { ChakraProvider, Spacer } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import theme from '@/styles/theme';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div style={{ position: 'relative' }}>
        <Header />
        <Component {...pageProps} />
        <Spacer />
        <Footer />
      </div>
    </ChakraProvider>
  );
}

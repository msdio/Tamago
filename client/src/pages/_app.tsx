import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, Spacer } from '@chakra-ui/react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Spacer />
      <Footer />
    </ChakraProvider>
  );
}

 
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Pretendard',
      },
    },
  },
});

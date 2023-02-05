import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, Spacer } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Pretendard',
        margin: '0',
        padding: '0',
        height: '100%',
      },
      '#__next': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
});

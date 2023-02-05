import type { AppProps } from 'next/app';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box paddingBottom='235px'>
        <Header />
        <Component {...pageProps} />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

const theme = extendTheme({
  styles: {
    global: {
      '*': {
        margin: '0',
        padding: '0',
      },
      'html, body': {
        fontFamily: 'Pretendard',
        postion: 'relative',
        minHeight: '100vh',
      },
    },
  },
});

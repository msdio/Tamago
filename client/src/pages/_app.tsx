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
        h: 'full',
        m: '0',
        p: '0',
        fontFamily: 'Pretendard',
      },
      // footer 바닥에 붙어있게 하기 위한 css
      '#__next': {
        h: 'full',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Pretendard',
      },
    },
  },
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
    tamago_gray: {
      100: '#fffaf8', // hover 등
      200: '#ff7a29',
      300: '#ff701e',
      400: '#ff6611',
      500: '#F5F5F5', // basic color
      600: '#F5F5F5', // hover?
      700: '#F5F5F5', // click?
      800: '#dc3d00',
      900: '#d23400',
    },
  },
});

import '@/styles/font.css';

import { ChakraProvider, Hide, Show } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import Hider from '@/components/common/Hider';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Show breakpoint='(max-width: 1199px)'>
          <Hider />
        </Show>
        <Hide breakpoint='(max-width: 1199px)'>
          <Component {...pageProps} />
        </Hide>
      </RecoilRoot>
    </ChakraProvider>
  );
}

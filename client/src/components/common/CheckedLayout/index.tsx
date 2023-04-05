import { Box, Flex } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

interface CheckedLayoutProps {
  children: ReactNode;
}

export default function CheckedLayout({ children }: CheckedLayoutProps) {
  return (
    <>
      <Header />
      <Flex
        as='main'
        flexDirection='column'
        h='calc(100vh - 88px)'
        minW='1100px'
        w='100%'
        backgroundColor='background.main'
        backgroundImage='linear-gradient(#EFDFD3 .0375rem, transparent .0625rem), linear-gradient(to right, #EFDFD3 .0625rem, #FFF .0625rem);'
        backgroundSize='3.75rem 3.7656rem'
        pos='relative'
      >
        {children}
        <Box w='full' h='173px' pos='absolute' bottom={0}>
          <Image src='/images/writing-type/bottom-grass.png' alt='grass' w='100%' />
        </Box>
        <Flex pos='absolute' bottom={125} left={0} right={0} justifyContent='center'>
          <Image src='/images/writing-type/eggs.png' alt='character' width={195} height={91} />
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

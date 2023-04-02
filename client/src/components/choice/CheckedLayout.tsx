import { Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface CheckedLayoutProps {
  children: ReactNode;
}

// TODO : 추후 다른 곳에서도 공통적으로 사용
export default function CheckedLayout({ children }: CheckedLayoutProps) {
  return (
    <Flex
      as='main'
      flexDirection='column'
      h='calc(100vh - 88px)'
      minW='1100px'
      w='100%'
      backgroundColor='background.main'
      backgroundImage='linear-gradient(#EFDFD3 .0375rem, transparent .0625rem), linear-gradient(to right, #EFDFD3 .0625rem, #FFF .0625rem);'
      backgroundSize='3.75rem 3.7656rem'
    >
      {children}
    </Flex>
  );
}

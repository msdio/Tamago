import { Flex, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <Flex as='main' direction='column' w='490px' m='171px auto 288px auto'>
      <Heading fontSize='28px' fontWeight='700' textAlign='center' mb='46px'>
        회원가입
      </Heading>
      {children}
    </Flex>
  );
}

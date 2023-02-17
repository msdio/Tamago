import { Flex, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <Flex justifyContent='center'>
      <Flex flexDirection='column' maxW='486px' w='486px' py='100px'>
        <Heading fontSize='28px' fontWeight='bold' mb='57px' textAlign='center'>
          로그인
        </Heading>
        {children}
      </Flex>
    </Flex>
  );
}
export default LoginLayout;

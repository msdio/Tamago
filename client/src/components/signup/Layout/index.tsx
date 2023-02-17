import { Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <Flex as='main' direction='column' w='490px' m='auto'>
      {children}
    </Flex>
  );
}

import { Flex, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function AuthLayout({ children, title }: LayoutProps) {
  return (
    <Flex as='main' direction='column' w='490px' m='171px auto 288px auto'>
      <Heading fontSize='28px' fontWeight='700' textAlign='center' mb='46px'>
        {title}
      </Heading>
      {children}
    </Flex>
  );
}

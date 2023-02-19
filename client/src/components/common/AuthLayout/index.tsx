import { Box, Flex, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  desc?: string;
}

export default function AuthLayout({ children, title, desc }: LayoutProps) {
  return (
    <Flex as='main' direction='column' w='490px' m='142px auto 288px auto'>
      <Box mb='46px'>
        {title && (
          <Heading as='h1' fontSize='28px' fontWeight='700' textAlign='center'>
            {title}
          </Heading>
        )}
        {desc ? (
          <Heading as='h3' textAlign='center' fontSize='17px' fontWeight='700' mt='26px'>
            {desc}
          </Heading>
        ) : null}
      </Box>

      {children}
    </Flex>
  );
}

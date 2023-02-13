import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

const HEADER_HEIGHT = '88px';
interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <Box as='header' h={HEADER_HEIGHT}>
        header
      </Box>
      <Flex
        h={`calc(100vh - ${HEADER_HEIGHT})`}
        as='main'
        justifyContent='center'
        alignItems={'center'}
        flexDirection='column'
      >
        {children}
      </Flex>
    </>
  );
}

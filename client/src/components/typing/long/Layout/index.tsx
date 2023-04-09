import { Box, Flex } from '@chakra-ui/react';

interface LongLayoutProps {
  children: React.ReactNode;
}

export default function LongLayout({ children }: LongLayoutProps) {
  return (
    <>
      <Flex
        as='main'
        flexDirection='column'
        minW='1100px'
        w='100%'
        backgroundColor='background.main'
        backgroundImage='linear-gradient(#EFDFD3 .0375rem, transparent .0625rem), linear-gradient(to right, #EFDFD3 .0625rem, #FFF .0625rem);'
        backgroundSize='3.75rem 3.7656rem'
        pos='relative'
      >
        <Box w='1170px' p='35px 0' m='auto' minW='1100px'>
          {children}
        </Box>
      </Flex>
    </>
  );
}

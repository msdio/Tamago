import { Flex } from '@chakra-ui/react';

export default function CheckedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      as='main'
      flexDirection='column'
      h='calc(100vh - 88px)'
      // NOTE : min w 1100px로 지정
      minW='1100px'
      w='100%'
      position='relative'
      backgroundColor='background.main'
      backgroundImage='linear-gradient(#EFDFD3 .0375rem, transparent .0625rem), linear-gradient(to right, #EFDFD3 .0625rem, #FFF .0625rem);'
      backgroundSize='3.75rem 3.7656rem'
    >
      {children}
    </Flex>
  );
}

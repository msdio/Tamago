import { Flex, Text } from '@chakra-ui/react';

export default function Wrapper({ children, content }: { children?: React.ReactNode; content: string }) {
  return (
    <Flex
      bg='white.light'
      border='0.6px solid'
      borderColor='black.dark'
      w='400px'
      h='128px'
      textAlign='center'
      borderRadius='10px'
      alignItems='center'
      justifyContent='center'
      fontWeight={600}
      fontSize='25px'
      pos='relative'
    >
      <Text>{content}</Text>
      {children}
    </Flex>
  );
}

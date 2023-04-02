import { Flex, Text } from '@chakra-ui/react';

interface TextBoxProps {
  content: string;
}

export default function TextBox({ content }: TextBoxProps) {
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
      _hover={{ bg: 'secondary.light' }}
    >
      <Text maxW='200px' wordBreak='keep-all'>
        {content}
      </Text>
    </Flex>
  );
}

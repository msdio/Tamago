import { Flex, Text } from '@chakra-ui/react';

export default function Menus() {
  return (
    <Flex alignItems='center' justifyContent='center' w='100%' h='100vh'>
      <Text fontSize='25px'>About Tamago</Text>
      <Text fontSize='36px' fontWeight='bold'>
        개발할 때 쓰이는 코드로
        <br />
        다양하게 타자 연습을
        <br />할 수 있어요.
      </Text>
    </Flex>
  );
}

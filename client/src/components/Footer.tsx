import { Container, Flex, HStack, Spacer, Stack, Text, VStack } from '@chakra-ui/react';

export function Footer() {
  return (
    <Container as='footer' h='235px' margin='0' padding='0' maxW='100%' minW='1100px'>
      <Flex
        direction='column'
        w='100%'
        h='100%'
        bg='#3F3C3B'
        color='#C4C4C4'
        fontSize='14px'
        padding='0 120px 0 120px'
        gap='33px'
      >
        <Spacer />
        <HStack alignContent=''>
          <Text>팀소개</Text>
          <Text> | </Text>
          <Text>이용약관</Text>
          <Text> | </Text>
          <Text>개인정보처리방침</Text>
          <Text> | </Text>
          <Text>FAQ</Text>
        </HStack>
        <HStack>
          <Text w='474px'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veni
          </Text>
        </HStack>
        <HStack>
          <Text>Copyrights ⓒ Lorem ipsum dolor</Text>
        </HStack>
        <Spacer />
      </Flex>
    </Container>
  );
}

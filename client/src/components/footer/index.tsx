import { Box, Flex, HStack, Spacer, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box as='footer' w='100%' h='235px' minW='1100px' zIndex='100'>
      <Flex direction='column' w='100%' h='100%' bg='#3F3C3B' color='#C4C4C4' fontSize='14px' p='0 120px' gap='33px'>
        <Spacer />
        <HStack>
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
    </Box>
  );
}

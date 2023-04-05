import { Box, Flex, Text } from '@chakra-ui/react';

export default function ModeLabel() {
  return (
    <Box w='fit-content' position='relative'>
      <Flex
        mb='21px'
        alignItems='center'
        gap='8.5px'
        border='0.6px solid #000000'
        bg='#BCF075'
        w='fit-content'
        p='10px 23px'
        borderRadius={30}
        h='38px'
      >
        <Text fontSize='18px' fontWeight={500}>
          짧은 글 연습모드
        </Text>
      </Flex>
    </Box>
  );
}

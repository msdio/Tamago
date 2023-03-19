import { Box, Flex, Text } from '@chakra-ui/react';

import DownArrow from '@/icons/DownArrow';

import TypingExit from '../../TypingExit';
import InfoBar from '../InfoBar';

interface TypingHeaderProps {
  time: number;
  wpm: number;
  accuracy: number;
  speed: number;
}

export default function TypingHeader(props: TypingHeaderProps) {
  return (
    <Flex gap='24px' mb='28px'>
      <Box w='118px' bg='#CEF0FF' border=' 0.6px solid #000000' borderRadius={10}></Box>
      <Box flex={1}>
        <Flex alignItems='center' justifyContent='space-between'>
          <Flex
            mb='21px'
            alignItems='center'
            gap='8.5px'
            border='0.6px solid #000000'
            bg='#BCF075'
            w='fit-content'
            p='10px 23px'
            borderRadius={30}
          >
            <Text fontSize='18px' fontWeight={500}>
              긴 글 연습모드
            </Text>
            <DownArrow />
          </Flex>
          <Box mb='21px'>
            <TypingExit />
          </Box>
        </Flex>
        <InfoBar {...props} />
      </Box>
    </Flex>
  );
}

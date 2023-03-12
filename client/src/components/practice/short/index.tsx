import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import type { ShortTypingResponseType } from '@/apis/typing';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import PrevTyping from '@/components/practice/short/PrevTyping';
import useStopwatch from '@/components/practice/short/useStopWatch';
import DownArrow from '@/icons/DownArrow';
import TwoRightArrow from '@/icons/TwoRightArrow';

const INIT_INFO = {
  wpm: 0,
  accuracy: 0,
  typist: 0,
};

// NOTE: 어떻게 합치면 좋을까
type PracticeShortProps = ShortTypingResponseType;

export default function PracticeShort({ typingWritings }: PracticeShortProps) {
  const [currentIdx] = useState(0);
  const [infos] = useState(INIT_INFO);

  const { time, status, timePlay, timePause } = useStopwatch();

  const handleStartTyping = () => {
    if (status === 'stop') {
      timePlay();
    }
  };

  const handleEndTyping = async () => {
    timePause();
  };

  return (
    <Box p='35px 120px' minW='1100px'>
      <Flex gap='24px'>
        <Box w='118px' bg='#CEF0FF' border=' 0.6px solid #000000' borderRadius={10}></Box>
        <Box flex={1}>
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
              짧은 글 연습모드
            </Text>

            <DownArrow />
          </Flex>

          <InfoBar {...infos} time={time.second} />
        </Box>
      </Flex>

      {typingWritings[currentIdx] && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' mt='28px'>
          <PrevTyping />

          <CurrentTyping writing={typingWritings[currentIdx]} onStart={handleStartTyping} onEnd={handleEndTyping} />

          <Flex p='24px 40px 32px' alignItems='center' gap='16.18px'>
            <TwoRightArrow />
            <Text fontSize='20px' color='#3C3C3C'>
              This source code is licensed under the MIT license found in the
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

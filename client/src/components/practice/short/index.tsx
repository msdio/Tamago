import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import type { ShortTypingResponseType } from '@/apis/typing';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import PrevTyping from '@/components/practice/short/PrevTyping';
import useStopwatch from '@/components/practice/short/useStopWatch';
import TwoRightArrow from '@/icons/TwoRightArrow';

const INIT_INFO = {
  wpm: 0,
  accuracy: 0,
  typist: 0,
};

// NOTE: 어떻게 합치면 좋을까
type PracticeShortProps = ShortTypingResponseType;

export default function PracticeShort({ typingWritings }: PracticeShortProps) {
  const [currentIdx, setcurrentIdx] = useState(0);
  const [infos, setInfos] = useState(INIT_INFO);

  const { time, status, timePlay, timePause } = useStopwatch();

  const handleStartTyping = () => {
    if (status === 'stop') {
      timePlay();
    }
  };

  const handleEndTyping = async (input: string) => {
    console.log('input: ', input);
    timePause();
  };

  return (
    <Box p='35px 120px' minW='1100px'>
      <InfoBar {...infos} time={time.second} />

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

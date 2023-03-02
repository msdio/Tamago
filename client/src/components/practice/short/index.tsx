import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import PrevTyping from '@/components/practice/short/PrevTyping';
import DownArrow from '@/icons/DownArrow';
import TwoRightArrow from '@/icons/TwoRightArrow';

const INIT_INFO = {
  time: 8,
  wpm: 0,
  accuracy: 0,
  typist: 0,
};
export default function PracticeShort() {
  const [writings, setWritings] = useState<ShortTypingType[]>([]);
  const [currentIdx, setcurrentIdx] = useState(0);
  const [infos, setInfos] = useState(INIT_INFO);

  const getShortTypingWritings = async () => {
    const { typingWritings } = await getShortTypingWritingsAPI();
    setWritings(typingWritings);
  };

  useEffect(() => {
    getShortTypingWritings();
  }, []);

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

          <InfoBar {...infos} />
        </Box>
      </Flex>

      {writings[currentIdx] && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' mt='28px'>
          <PrevTyping />

          <CurrentTyping writing={writings[currentIdx]} />

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

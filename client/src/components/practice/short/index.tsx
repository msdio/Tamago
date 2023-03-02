import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import DownArrow from '@/icons/DownArrow';

export default function PracticeShort() {
  const [writings, setWritings] = useState<ShortTypingType[]>([]);
  const [currentIdx, setcurrentIdx] = useState(0);

  const getShortTypingWritings = async () => {
    const { typingWritings } = await getShortTypingWritingsAPI();
    setWritings(typingWritings);
  };

  useEffect(() => {
    getShortTypingWritings();
  }, []);

  return (
    <Box p='35px 120px' minW='1100px'>
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

      <InfoBar time={8} wpm={0} accuracy={0} typist={0} />

      {writings[currentIdx] && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' h='403px' mt='28px'>
          <Box
            border='0.6px solid #000000'
            position='absolute'
            w='calc(100% + 32px)'
            left='--16px'
            right='-16px'
            top='0'
            bottom='0'
            margin='auto'
            h='fit-content'
          >
            <CurrentTyping writing={writings[currentIdx]} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

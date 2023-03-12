import { Box, Flex, Text } from '@chakra-ui/react';

import type { ShortTypingResponseType } from '@/apis/typing';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import PrevTyping from '@/components/practice/short/PrevTyping';
import { useShortTypingContext } from '@/components/practice/short/shortTypingContext';
import TwoRightArrow from '@/icons/TwoRightArrow';

// NOTE: 어떻게 합치면 좋을까
type PracticeShortProps = ShortTypingResponseType;

export default function PracticeShort({}: PracticeShortProps) {
  const { currentWritingContent, nextWritingContent } = useShortTypingContext();

  return (
    <Box p='35px 120px' minW='1100px'>
      <InfoBar />

      {currentWritingContent && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' mt='28px'>
          <PrevTyping />

          <CurrentTyping />

          <Flex p='24px 40px 32px' alignItems='center' gap='16.18px'>
            <TwoRightArrow />
            <Text fontSize='20px' color='#3C3C3C'>
              {nextWritingContent}
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

import { Box, Flex, Text } from '@chakra-ui/react';

import ResultModal from '@/components/common/ResultModal/practice-mode';
import {
  useContextShortTyping,
  useContextTypingResultModal,
} from '@/components/practice/short/_hook/contextShortTyping';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import PrevTyping from '@/components/practice/short/PrevTyping';
import TwoRightArrow from '@/icons/TwoRightArrow';

export default function PracticeShort() {
  // TODO : short typing result 평균으로 받아오기
  const { originalTyping, nextOriginalTyping, time, typingSpeed, typingWpm, typingAccuracy } = useContextShortTyping();
  const { isResultModalOpen, handleResultModalClose } = useContextTypingResultModal();

  return (
    <Box p='35px 120px' minW='1100px'>
      <InfoBar />

      {originalTyping && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' mt='28px'>
          <PrevTyping />

          <CurrentTyping />

          <Flex p='24px 40px 32px' alignItems='center' gap='16.18px'>
            <TwoRightArrow />
            <Text fontSize='20px' color='#3C3C3C'>
              {nextOriginalTyping}
            </Text>
          </Flex>
        </Box>
      )}

      <ResultModal
        isOpen={isResultModalOpen}
        onReplay={handleResultModalClose}
        result={{
          typingSpeed,
          typingWpm,
          typingAccuracy,
          typingTime: time,
        }}
      />
    </Box>
  );
}

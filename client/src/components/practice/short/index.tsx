import { Box, Flex, Text } from '@chakra-ui/react';

import {
  useContextShortTyping,
  useContextTypingResultModal,
} from '@/components/practice/short/_hook/contextShortTyping';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import PrevTyping from '@/components/practice/short/PrevTyping';
import ResultModal from '@/components/practice/short/ResultModal';
import TwoRightArrow from '@/icons/TwoRightArrow';

export default function PracticeShort() {
  const { originalTyping, nextOriginalTyping } = useContextShortTyping();
  const { isResultModalOpen } = useContextTypingResultModal();

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

      <ResultModal isOpen={isResultModalOpen} onReplay={() => {}} />
    </Box>
  );
}

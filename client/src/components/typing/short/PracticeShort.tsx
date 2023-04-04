import { Box, Flex, Text } from '@chakra-ui/react';

import {
  useContextShortTyping,
  useContextShortTypingHandler,
} from '@/components/typing/short/_hook/contextShortTyping';
import CurrentTyping from '@/components/typing/short/CurrentTyping';
import InfoBar from '@/components/typing/short/InfoBar';
import PrevTyping from '@/components/typing/short/PrevTyping';
import TwoRightArrow from '@/icons/TwoRightArrow';

export default function PracticeShort() {
  const { originalTyping, nextOriginalTyping } = useContextShortTyping();
  const { handleExitModalOpen } = useContextShortTypingHandler();

  return (
    <Box p='35px 120px' minW='1100px'>
      <InfoBar onExit={handleExitModalOpen} />

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
    </Box>
  );
}

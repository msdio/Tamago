import { Box, Flex, Text } from '@chakra-ui/react';

import type { ShortTypingType } from '@/apis/typing';
import TypingPagination from '@/components/common/TypingPagination';
import {
  useContextPrevNextTypingInfo,
  useContextShortTyping,
  useContextShortTypingHandler,
} from '@/components/typing/short/_hook/contextShortTyping';
import CurrentTyping from '@/components/typing/short/CurrentTyping';
import InfoBar from '@/components/typing/short/InfoBar';
import PrevTyping from '@/components/typing/short/PrevTyping';
import TwoRightArrow from '@/icons/TwoRightArrow';

export default function ActualShort({ originalTypings }: { originalTypings: ShortTypingType[] }) {
  const { originalTyping, index: currentIdx } = useContextShortTyping();
  const { nextOriginalTyping } = useContextPrevNextTypingInfo();
  const { onExit } = useContextShortTypingHandler();

  return (
    <Box p='35px 120px' minW='1100px'>
      <InfoBar onExit={onExit} />

      {originalTyping && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' mt='28px' bg='#fff'>
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

      <Flex mt='33px' justifyContent='right'>
        <TypingPagination currentPage={currentIdx + 1} totalPage={originalTypings.length} />
      </Flex>
    </Box>
  );
}

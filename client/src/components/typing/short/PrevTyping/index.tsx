import { Box, Text } from '@chakra-ui/react';

import { useContextPrevNextTypingInfo } from '@/components/typing/short/_hook/contextShortTyping';
import OriginalTyping from '@/components/typing/short/OriginalTyping';

function PrevTyping() {
  const { prevUserTyping, prevOriginalTyping } = useContextPrevNextTypingInfo();

  return (
    <Box m='26px 36px'>
      <Box p='11px 17px' borderRadius='10px' h='48px'>
        <Box color='#7B7B7B' fontSize={20}>
          <OriginalTyping originalTyping={prevOriginalTyping} userTyping={prevUserTyping} />
        </Box>
      </Box>
      <Box p='11px 17px' bg='#F4F4F4' borderRadius='10px' h='48px'>
        <Text color='#7B7B7B' fontSize={20}>
          {prevUserTyping}
        </Text>
      </Box>
    </Box>
  );
}
export default PrevTyping;

import { Box, Text } from '@chakra-ui/react';

import OriginalWriting from '@/components/practice/short/OriginalWriting';
import { useShortTypingContext } from '@/components/practice/short/shortTypingContext';

function PrevTyping() {
  const { prevWritingInput, prevWritingCorrect } = useShortTypingContext();

  return (
    <Box m='26px 36px'>
      <Box p='11px 17px' borderRadius='10px' h='48px'>
        <Box color='#7B7B7B' fontSize={20}>
          <OriginalWriting originalWriting={prevWritingCorrect} inputWriting={prevWritingInput} />
        </Box>
      </Box>
      <Box p='11px 17px' bg='#F4F4F4' borderRadius='10px' h='48px'>
        <Text color='#7B7B7B' fontSize={20}>
          {prevWritingInput}
        </Text>
      </Box>
    </Box>
  );
}
export default PrevTyping;

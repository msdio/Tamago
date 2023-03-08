import { Box, Text } from '@chakra-ui/react';

import CorrectWriting from '@/components/practice/short/CorrectWriting';
import { useShortTypingContext } from '@/components/practice/short/shortTypingContext';

function PrevTyping() {
  const { prevWritingInput, prevWritingCorrect } = useShortTypingContext();

  return (
    <Box m='26px 36px'>
      <Box p='11px 17px' borderRadius='10px'>
        <Text color='#7B7B7B' fontSize={20}>
          <CorrectWriting correctWriting={prevWritingCorrect} inputWriting={prevWritingInput} />
        </Text>
      </Box>
      <Box p='11px 17px' bg='#F4F4F4' borderRadius='10px'>
        <Text color='#7B7B7B' fontSize={20}>
          {prevWritingInput}
        </Text>
      </Box>
    </Box>
  );
}
export default PrevTyping;

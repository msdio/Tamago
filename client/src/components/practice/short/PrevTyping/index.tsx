import { Box, Text } from '@chakra-ui/react';

function PrevTyping() {
  return (
    <Box m='26px 36px'>
      <Box p='11px 17px' borderRadius='10px'>
        <Text color='#7B7B7B' fontSize={20}>
          * Copyright (c) Meta Platforms, Inc. and affilates.
        </Text>
      </Box>
      <Box p='11px 17px' bg='#F4F4F4' borderRadius='10px'>
        <Text color='#7B7B7B' fontSize={20}>
          * Copyright (c) Meta Platforms, Inc. and affilates.
        </Text>
      </Box>
    </Box>
  );
}
export default PrevTyping;

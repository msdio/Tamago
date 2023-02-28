import { Box, Input, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface CurrentTypingProps {
  writing: ShortTypingType;
}
export default function CurrentTyping({ writing }: CurrentTypingProps) {
  return (
    <Box p='30px 49px'>
      <Box pl='5px'>
        <Text fontSize='24px' fontWeight='bold'>
          {writing.content}
        </Text>
      </Box>

      <Input
        variant='flushed'
        placeholder=' '
        type='text'
        value={input}
        onChange={handleInput}
        w='100%'
        p='11px 5px'
        fontSize='24px'
      />
    </Box>
  );
}

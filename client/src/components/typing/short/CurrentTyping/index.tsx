import { Box, Input } from '@chakra-ui/react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import {
  useContextShortTyping,
  useContextShortTypingHandler,
} from '@/components/typing/short/_hook/contextShortTyping';
import OriginalTyping from '@/components/typing/short/OriginalTyping';

export default function CurrentTyping() {
  const { originalTyping, userTyping } = useContextShortTyping();
  const { onEndTyping, onTyping } = useContextShortTypingHandler();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    onTyping(input);

    if (input.length > originalTyping.length) {
      onEndTyping(input.slice(0, originalTyping.length));
    }
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    //? NOTE: enter 누른 경우 -> submit
    if (e.key === 'Enter') {
      e.preventDefault();
      onEndTyping(userTyping.padEnd(originalTyping.length, ' '));
    }
  };

  if (!originalTyping) return <></>;

  return (
    <Box
      border='0.6px solid #000000'
      position='relative'
      w='calc(100% + 32px)'
      left='-16px'
      right='-16px'
      top='0'
      bottom='0'
      margin='auto'
      h='fit-content'
      borderRadius={10}
      p='30px 49px'
      bg='#FFF2BA'
    >
      <OriginalTyping originalTyping={originalTyping} userTyping={userTyping} isTyping />

      <Input
        bg='#FFE98B'
        variant='flushed'
        placeholder=' '
        type='text'
        value={userTyping}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        w='100%'
        p='11px 5px'
        height='48px'
        fontSize='23px'
        onSelect={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
      />
    </Box>
  );
}

import { Box, Input } from '@chakra-ui/react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import OriginalTyping from '@/components/practice/short/OriginalTyping';
import { useShortTypingContext, useShortTypingHandlerContext } from '@/components/practice/short/shortTypingContext';
import { checkAllInputTyping } from '@/components/practice/short/utils';

export default function CurrentTyping() {
  const { originalTyping } = useShortTypingContext();
  const { onEndTyping, onBackspace, onTyping } = useShortTypingHandlerContext();

  // const [userTyping, setUserTyping] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    onTyping(input);

    //? NOTE: 마지막 글자까지 입력하면, 제출하고 다음 문장으로 넘어간다.
    if (word.length === originalTyping.length) {
      const isLast = checkAllInputTyping({
        typingWord: word[originalTyping.length - 1],
        originalWord: originalTyping[originalTyping.length - 1],
      });

      if (isLast) {
        onEndTyping(word);
      }
    }
    if (word.length > originalTyping.length) {
      onEndTyping(word);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //? NOTE: enter 누른 경우 -> submit
    if (e.key === 'Enter') {
      e.preventDefault();
      onEndTyping(userTyping);
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
      <OriginalTyping originalTyping={originalTyping} userTyping={userTyping} />

      <Input
        bg='#FFE98B'
        variant='flushed'
        placeholder=' '
        type='text'
        value={userTyping}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
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

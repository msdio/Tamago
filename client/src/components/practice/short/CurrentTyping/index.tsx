import { Box, Input } from '@chakra-ui/react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import CorrectWriting from '@/components/practice/short/CorrectWriting';
import { useShortTypingContext, useShortTypingHandlerContext } from '@/components/practice/short/shortTypingContext';
import { checkAllInputTyping } from '@/components/practice/short/utils';

const INIT_INPUT = '';

export interface SubmitRequestType {
  correctWriting: string;
  input: string;
}

export default function CurrentTyping({}) {
  const { currentWritingContent: correctWriting } = useShortTypingContext();
  const { onEndTyping, onBackspace, onTyping } = useShortTypingHandlerContext();

  const [input, setInput] = useState(INIT_INPUT);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setInput(word);

    // NOTE : backspace 누른 경우
    if (input.length > word.length) {
      return;
    }

    onTyping(word);

    //? NOTE: 마지막 글자까지 입력하면, 제출하고 다음 문장으로 넘어간다.
    if (word.length === correctWriting.length) {
      const isLast = checkAllInputTyping({
        typingWord: word[correctWriting.length - 1],
        originalWord: correctWriting[correctWriting.length - 1],
      });

      if (isLast) {
        onEndTyping(word);
      }
    }
    if (word.length > correctWriting.length) {
      onEndTyping(word);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //? NOTE: enter 누른 경우 -> submit
    if (e.key === 'Enter') {
      e.preventDefault();
      onEndTyping(input);
    }

    // TODO : backspace 누른 경우 -> 타수에 영향
    if (e.key === 'Backspace') {
      onBackspace();
    }
  };

  useEffect(() => {
    setInput(INIT_INPUT);
  }, [correctWriting]);

  if (!correctWriting) return <></>;

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
      <CorrectWriting correctWriting={correctWriting} inputWriting={input} />

      <Input
        bg='#FFE98B'
        variant='flushed'
        placeholder=' '
        type='text'
        value={input}
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

import { Box, Flex, Input, Text } from '@chakra-ui/react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useShortTypingContext, useShortTypingHandlerContext } from '@/components/practice/short/shortTypingContext';
import { checkAllInputTyping } from '@/utils/typing';

const INIT_INPUT = '';

export interface SubmitRequestType {
  correctWriting: string;
  input: string;
}

export default function CurrentTyping({}) {
  const { currentWritingContent: correctWriting } = useShortTypingContext();
  const { onStartTyping, onEndTyping, onBackspace, onTyping } = useShortTypingHandlerContext();

  const [input, setInput] = useState(INIT_INPUT);

  //? NOTE: 입력값과 실제 입력해야 하는 값을 비교하고, error를 띄운다
  const typingWriting = correctWriting?.split('').map((word, idx) => {
    if (word === ' ') {
      return <Text key={idx}>&nbsp;</Text>;
    }
    if (idx < input.length - 1 && word !== input[idx]) {
      return (
        <Text color='red' key={idx}>
          {word}
        </Text>
      );
    }
    return <Text key={idx}>{word}</Text>;
  });

  // const setErrorWord = (idx: number, errorWord: ErrorWordType) => {
  //   // NOTE: error word를 index마다 관리하고,
  //   // 지금 입력하는 index가 아니면 오류를 보여주는 방향으로
  //   const prevErrorWords = [...errorWordList];

  //   prevErrorWords[idx] = errorWord;
  //   setErrorWordList(prevErrorWords);
  // };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setInput(word);

    onTyping(word);

    //? NOTE: 마지막 글자까지 입력하면, 제출하고 다음 문장으로 넘어간다.
    if (word.length === correctWriting.length) {
      const isLast = checkAllInputTyping(word[correctWriting.length - 1], correctWriting[correctWriting.length - 1]);
      if (isLast) {
        onEndTyping(word);
      }
    }
    if (word.length > correctWriting.length) {
      onEndTyping(word);
    }

    // const currentIdx = word.length - 1;
    // const lastWord = word[currentIdx];
    // const correctLastWord = writing.content[currentIdx];

    // const currentErrorWords = checkErrorWord(correctLastWord, lastWord);
    // setErrorWord(currentIdx, currentErrorWords);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    //? NOTE: enter 누른 경우 -> submit
    if (e.key === 'Enter') {
      e.preventDefault();
      onEndTyping(input);
    }

    // TODO : backspace 누른 경우 -> 타수에 영향
    if (e.key === 'Backspace') {
      // e.preventDefault();
      onBackspace();
    }
  };

  useEffect(() => {
    setInput(INIT_INPUT);
  }, [correctWriting]);

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
      <Flex pl='5px' mb='10px' fontSize='23px' fontWeight={500}>
        {typingWriting}
      </Flex>

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

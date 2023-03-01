import { Box, Flex, Input, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { checkEqualEnglish, checkEqualHangul, isHangulChar } from '@/utils/hangul';

type ErrorWordType = Record<string, number>;

interface CurrentTypingProps {
  writing: ShortTypingType;
}

const mergeObj = (obj1: ErrorWordType, obj2: ErrorWordType) => {
  const newObj = { ...obj1 };
  for (const key in obj2) {
    newObj[key] += obj1[key];
  }

  return newObj;
};

// NOTE:
// 1. 글자가 끝났는지 확인한다
// 2. 글자가 끝났다면, 글자가 틀렸는지 확인한다.
// 3. 틀렸다면, 에러 단어에 추가한다.

export default function CurrentTyping({ writing }: CurrentTypingProps) {
  const [input, setInput] = useState('');
  const [errorWordList, setErrorWordList] = useState<ErrorWordType[]>([]);
  const currentIdx = input.length - 1;

  const typingWriting = writing.content.split('').map((word, idx) => {
    if (currentIdx >= idx && Object.keys(errorWordList[idx]).length > 0) {
      return (
        <Text color='red' key={idx}>
          {word}
        </Text>
      );
    }
    return <Text key={idx}>{word}</Text>;
  });

  const setErrorWord = (idx: number, errorWord: ErrorWordType) => {
    // NOTE: error word를 index마다 관리하고,
    // 지금 입력하는 index가 아니면 오류를 보여주는 방향으로
    const prevErrorWords = [...errorWordList];

    prevErrorWords[idx] = errorWord;
    setErrorWordList(prevErrorWords);
  };

  const checkErrorWord = (correctWord: string, inputWord: string) => {
    const isHangul = isHangulChar(correctWord);

    if (isHangul) {
      const currentErrorWords = checkEqualHangul(correctWord, inputWord);
      return currentErrorWords;
    } else {
      const currentErrorWords = checkEqualEnglish(correctWord, inputWord);
      return currentErrorWords;
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setInput(word);

    const currentIdx = word.length - 1;
    const lastWord = word[currentIdx];
    const correctLastWord = writing.content[currentIdx];

    const currentErrorWords = checkErrorWord(correctLastWord, lastWord);
    setErrorWord(currentIdx, currentErrorWords);
  };

  return (
    <Box p='30px 49px'>
      <Flex pl='5px' fontSize='24px' fontWeight='bold'>
        {typingWriting}
      </Flex>

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

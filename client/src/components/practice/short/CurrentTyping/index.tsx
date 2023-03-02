import { Box, Flex, Input, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';

interface CurrentTypingProps {
  writing: ShortTypingType;
}

export default function CurrentTyping({ writing }: CurrentTypingProps) {
  const [input, setInput] = useState('');
  // const [errorWordList, setErrorWordList] = useState<ErrorWordType[]>([]);

  //? NOTE: 입력값과 실제 입력해야 하는 값을 비교하고, error를 띄운다
  const typingWriting = writing.content.split('').map((word, idx) => {
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

  // TODO : error word를 잡는것은 서버에 보낼때만 하면 된다, 이전에는 값이 틀린지 아닌지만 체크하면 된다.
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

    // const currentIdx = word.length - 1;
    // const lastWord = word[currentIdx];
    // const correctLastWord = writing.content[currentIdx];

    // const currentErrorWords = checkErrorWord(correctLastWord, lastWord);
    // setErrorWord(currentIdx, currentErrorWords);
  };

  return (
    <Box p='30px 49px' bg='#FFF2BA'>
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

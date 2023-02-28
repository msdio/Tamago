import { Box, Input, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { checkEqualHangul, isHangulChar } from '@/utils/hangul';

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

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setInput(word);

    const currentIdx = word.length - 1;
    const lastWord = word[currentIdx];
    const correctLastWord = writing.content[currentIdx];

    // NOTE: 한글인 경우
    const isHangul = isHangulChar(lastWord);

    if (isHangul) {
      const currentErrorWords = checkEqualHangul(correctLastWord, lastWord);
      // idx마다 따로 체크해야할것 같다고 생각이 든다.
      // 치는 도중에 에러가 발생하나?
      const prevErrorWords = [...errorWordList];
      console.log('prevErrorWords: ', prevErrorWords);
      prevErrorWords[currentIdx] = currentErrorWords;
      setErrorWordList(prevErrorWords);
    }
  };

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

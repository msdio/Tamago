import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

import Wrapper from '@/components/choice/LanguageBox/Wrapper';

const LANGUAGE_STRING = {
  korean: '한글 타자',
  english: '영문 타자',
  code: '코드 선택',
  random: '진짜 강자들만 선택할 수 있는 랜덤',
};

interface LanguageBoxProps {
  path: string;
  language: 'korean' | 'english' | 'code' | 'random';
}

export default function LanguageBox({ path, language }: LanguageBoxProps) {
  if (language === 'code') {
    return <Wrapper content={LANGUAGE_STRING['code']}></Wrapper>;
  }
  if (language === 'random') {
    return (
      <Wrapper content={LANGUAGE_STRING['random']}>
        <Box
          pos='absolute'
          top='-32px'
          left='-67px'
          backgroundImage='/images/speech-bubble.png'
          backgroundSize='221px 50px'
          w='221px'
          h='50px'
        >
          <Text fontSize='18px' color='primary.dark' lineHeight='45px'>
            고수라면 도전해보세요!
          </Text>
        </Box>
      </Wrapper>
    );
  }
  return (
    <Link href={`${path}?language=${language}`}>
      <Wrapper content={LANGUAGE_STRING[language]} />
    </Link>
  );
}

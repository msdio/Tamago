import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

import CodeDropDown from '@/components/choice/LanguageBox/CodeDropDown';
import TextBox from '@/components/choice/LanguageBox/TextBox';
import { speechBubbleShake } from '@/constants/animations';
import useToggle from '@/hooks/useToggle';
import { DownArrow } from '@/icons/Arrow';

const LANGUAGE_STRING = {
  korean: '한글 타자',
  english: '영문 타자',
  code: '코드 선택',
  random: '진짜 강자들만 선택할 수 있는 랜덤',
};

const CODE_LANGUAGE = ['javascript', 'python', 'java'];

const getRandomLanguage = () => {
  const languageList = [...CODE_LANGUAGE, 'korean', 'english'];
  const randomIdx = Math.floor(Math.random() * languageList.length);

  return languageList[randomIdx];
};

interface LanguageBoxProps {
  path: string;
  language: 'korean' | 'english' | 'code' | 'random';
}

export default function LanguageBox({ path, language }: LanguageBoxProps) {
  const [isCodeOpen, toggleCodeOpen] = useToggle();

  if (language === 'code') {
    return (
      <Box onClick={toggleCodeOpen} pos='relative'>
        <TextBox content={LANGUAGE_STRING['code']} />

        <Box pos='absolute' top='52px' right='50px'>
          <DownArrow w={4} h={6} />
        </Box>
        {/* 슬라이드 애니매이션? */}
        {isCodeOpen && <CodeDropDown path={path} />}
      </Box>
    );
  }

  if (language === 'random') {
    return (
      <Box pos='relative'>
        <Link href={`${path}?language?=${getRandomLanguage()}`}>
          <TextBox content={LANGUAGE_STRING['random']} />
        </Link>
        <Box
          pos='absolute'
          top='-32px'
          left='-67px'
          backgroundImage='/images/speech-bubble.png'
          backgroundSize='221px 50px'
          w='221px'
          h='50px'
          animation={speechBubbleShake + ' 3s infinite ease'}
        >
          <Text fontSize='18px' color='primary.dark' lineHeight='45px' textAlign='center'>
            고수라면 도전해보세요!
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Link href={`${path}?language=${language}`}>
      <TextBox content={LANGUAGE_STRING[language]} />
    </Link>
  );
}

import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

import ProgrammingDropDown from '@/components/choice/LanguageBox/ProgrammingDropDown';
import TextBox from '@/components/choice/LanguageBox/TextBox';
import { speechBubbleShake } from '@/constants/animations';
import { SELECT_LANGUAGE_LABEL } from '@/constants/language';
import useToggle from '@/hooks/useToggle';
import { DownArrow } from '@/icons/Arrow';
import type { SelectLanguageType } from '@/types/language';
import { getRandomLanguage } from '@/utils/language';

interface LanguageBoxProps {
  path: string;
  language: SelectLanguageType;
}

export default function LanguageBox({ path, language }: LanguageBoxProps) {
  const [isCodeOpen, toggleCodeOpen] = useToggle();

  if (language === 'code') {
    return (
      <Box onClick={toggleCodeOpen} pos='relative'>
        <TextBox content={SELECT_LANGUAGE_LABEL['code']} />

        <Box pos='absolute' top='52px' right='50px'>
          <DownArrow w={4} h={6} />
        </Box>
        {/* 슬라이드 애니매이션? */}
        {isCodeOpen && <ProgrammingDropDown path={path} />}
      </Box>
    );
  }

  if (language === 'random') {
    return (
      <Box pos='relative'>
        <Link href={`${path}?language?=${getRandomLanguage()}`}>
          <TextBox content={SELECT_LANGUAGE_LABEL['random']} />
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
      <TextBox content={SELECT_LANGUAGE_LABEL[language]} />
    </Link>
  );
}

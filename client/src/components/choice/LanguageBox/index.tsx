import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';

import ProgrammingDropDown from '@/components/choice/LanguageBox/ProgrammingDropDown';
import TextBox from '@/components/choice/LanguageBox/TextBox';
import { speechBubbleShake } from '@/constants/animations';
import { SELECT_LANGUAGE_VALUE } from '@/constants/language';
import useToggle from '@/hooks/useToggle';
import { DownArrow } from '@/icons/Arrow';
import type { SelectLanguageItemType } from '@/types/language';
import { getRandomLanguage } from '@/utils/language';

interface LanguageBoxProps {
  path: string;
  select: SelectLanguageItemType;
}

export default function LanguageBox({ path, select }: LanguageBoxProps) {
  const [isCodeOpen, toggleCodeOpen] = useToggle();

  const { value: language, label } = select;
  if (language === SELECT_LANGUAGE_VALUE.CODE) {
    return (
      <Box onClick={toggleCodeOpen} pos='relative'>
        <TextBox content={label} />

        <Box pos='absolute' top='52px' right='50px'>
          <DownArrow w={4} h={6} />
        </Box>
        {/* TODO : 슬라이드 애니매이션  */}
        {isCodeOpen && <ProgrammingDropDown path={path} />}
      </Box>
    );
  }

  if (language === SELECT_LANGUAGE_VALUE.RANDOM) {
    return (
      <Box pos='relative'>
        <Link href={`${path}?language?=${getRandomLanguage()}`}>
          <TextBox content={label} />
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
      <TextBox content={label} />
    </Link>
  );
}

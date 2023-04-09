import { Box, Flex, Grid } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

import ChoiceHeading from '@/components/choice/Heading';
import LanguageBox from '@/components/choice/LanguageBox';
import CheckedLayout from '@/components/common/CheckedLayout';
import { SELECT_LANGUAGE } from '@/constants/language';
import { CONTENT_TYPE, TYPING_MODE } from '@/constants/typing';
import type { ContentType, TypingMode } from '@/types/typing';

interface ChoiceProps {
  contentType: ContentType;
  typingType: TypingMode;
}

export default function Choice({ contentType, typingType }: ChoiceProps) {
  const title = `${contentType === CONTENT_TYPE.SHORT ? '짧은 글' : '긴 글'} ${
    typingType === TYPING_MODE.PRACTICE ? '연습' : '실전'
  }타자`;

  const basePath = typingType === TYPING_MODE.PRACTICE ? '/practice' : '/actual';
  const contentPath = contentType === CONTENT_TYPE.SHORT ? '/short' : '/long';
  const path = basePath + contentPath;

  return (
    <CheckedLayout>
      <ChoiceHeading title={title} />
      <Grid templateColumns='repeat(2, 400px)' justifyContent='center' gap='32px'>
        {Object.values(SELECT_LANGUAGE).map((language) => (
          <LanguageBox key={'language-box-' + language.value} path={path} select={language} />
        ))}
      </Grid>
      <Box w='full' h='173px' pos='absolute' bottom={0}>
        <Image src='/images/writing-type/bottom-grass.png' alt='grass' w='100%' h='100%' />
      </Box>
      <Flex pos='absolute' bottom={125} left={0} right={0} justifyContent='center'>
        <Image src='/images/writing-type/eggs.png' alt='character' width={195} height={91} />
      </Flex>
    </CheckedLayout>
  );
}

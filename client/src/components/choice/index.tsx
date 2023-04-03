import { Grid } from '@chakra-ui/react';

import CheckedLayout from '@/components/choice/CheckedLayout';
import ChoiceHeading from '@/components/choice/Heading';
import LanguageBox from '@/components/choice/LanguageBox';
import { SELECT_LANGUAGE } from '@/constants/language';
import { CONTENT_TYPE } from '@/constants/typing';
import type { ContentType } from '@/types/typing';

interface ChoiceProps {
  contentType: ContentType;
  typingType: 'practice' | 'exam';
}

export default function Choice({ contentType, typingType }: ChoiceProps) {
  const title = `${contentType === CONTENT_TYPE.SHORT ? '짧은 글' : '긴 글'} ${
    typingType === 'practice' ? '연습' : '실전'
  }타자`;
  const path = `/${typingType}/${contentType === CONTENT_TYPE.SHORT ? 'short' : 'long'}`;

  // TODO : 공통 배경 추가
  return (
    <CheckedLayout>
      <ChoiceHeading title={title} />
      <Grid templateColumns='repeat(2, 400px)' justifyContent='center' gap='32px'>
        <LanguageBox path={path} select={SELECT_LANGUAGE.RANDOM} />
        <LanguageBox path={path} select={SELECT_LANGUAGE.KOREAN} />
        <LanguageBox path={path} select={SELECT_LANGUAGE.ENGLISH} />
        <LanguageBox path={path} select={SELECT_LANGUAGE.CODE} />
      </Grid>
    </CheckedLayout>
  );
}

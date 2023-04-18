import { Flex } from '@chakra-ui/react';

import InfoItem from '@/components/common/ResultModal/InfoList/Item';
import type { TypingResultType } from '@/types/typing';
import { getSecondToMMSSFormat } from '@/utils/time';

type InfoListProps = TypingResultType;

export default function InfoList({ typingTime, typingAccuracy, typingWpm, typingSpeed }: InfoListProps) {
  return (
    <Flex flexDirection='column' gap='10px'>
      <InfoItem label='경과시간' content={getSecondToMMSSFormat(typingTime)} isDarkBg />
      <InfoItem label='WPM' content={typingWpm} />
      <InfoItem label='정확도' content={typingAccuracy.toFixed(2) + '%'} isDarkBg />
      <InfoItem label='타자' content={typingSpeed + '타'} />
    </Flex>
  );
}

import InfoItem from '@/components/common/ResultModal/InfoList/Item';
import type { TypingResultType } from '@/types/typing';
import { getSecondToMMSSFormat } from '@/utils/time';

type InfoListProps = TypingResultType;

export default function InfoList({ typingTime, typingAccuracy, typingWpm, typingSpeed }: InfoListProps) {
  return (
    <>
      <InfoItem label='경과시간' content={getSecondToMMSSFormat(typingTime)} isDarkBg />
      <InfoItem label='WPM' content={typingWpm} />
      <InfoItem label='정확도' content={typingAccuracy + '%'} isDarkBg />
      <InfoItem label='타자' content={typingSpeed + '타'} />
    </>
  );
}

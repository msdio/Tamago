import Choice from '@/components/choice';
import { CONTENT_TYPE } from '@/constants/typing';

export default function ExamLongChoicePage() {
  return (
    <>
      <Choice contentType={CONTENT_TYPE.LONG} typingType='exam' />
    </>
  );
}

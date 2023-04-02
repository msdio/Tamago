import Choice from '@/components/choice';
import { CONTENT_TYPE } from '@/constants/typing';

export default function PracticeShortChoicePage() {
  return (
    <div>
      <Choice contentType={CONTENT_TYPE.SHORT} typingType='practice' />
    </div>
  );
}

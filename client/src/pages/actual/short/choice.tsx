import Choice from '@/components/choice';
import { CONTENT_TYPE, TYPING_MODE } from '@/constants/typing';

export default function ActualShortChoicePage() {
  return (
    <div>
      <Choice contentType={CONTENT_TYPE.SHORT} typingType={TYPING_MODE.ACTUAL} />
    </div>
  );
}

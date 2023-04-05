import Choice from '@/components/choice';
import { CONTENT_TYPE, TYPING_MODE } from '@/constants/typing';

export default function ActualLongChoicePage() {
  return (
    <div>
      <Choice contentType={CONTENT_TYPE.LONG} typingType={TYPING_MODE.ACTUAL} />
    </div>
  );
}

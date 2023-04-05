import Choice from '@/components/choice';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { CONTENT_TYPE } from '@/constants/typing';

export default function ExamLongChoicePage() {
  return (
    <>
      <Header />
      <Choice contentType={CONTENT_TYPE.LONG} typingType='exam' />
      <Footer />
    </>
  );
}

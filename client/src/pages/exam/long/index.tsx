import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { examLongTypingAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ExamLongTyping from '@/components/typing/long/Exam';
import type { LongTypingDetail } from '@/types/typing';

export default function ExamLongTypingPage() {
  const router = useRouter();

  const [data, setData] = useState<LongTypingDetail | null>(null);

  const getLongTyping = async (language: string) => {
    const { result } = await examLongTypingAPI(language);
    console.log(result);
    setData(result);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { language } = router.query as { language: string };
    getLongTyping(language);
  }, [router.isReady, router.asPath]);

  // TODO: 로딩창
  if (!router.isReady || !data) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      <ExamLongTyping {...data} />
      <Footer />
    </>
  );
}

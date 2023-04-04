import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ExamLongTyping from '@/components/typing/long/Exam';
import type { LongTypingDetail } from '@/types/typing';

export default function ExamLongTypingPage() {
  const router = useRouter();

  const [data, setData] = useState<LongTypingDetail | null>(null);

  const getLongTyping = async () => {
    const { result } = await getLongTypingAPI({ typingId: '1', pageNum: '1' });
    setData(result);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    getLongTyping();
  }, [router.isReady]);

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

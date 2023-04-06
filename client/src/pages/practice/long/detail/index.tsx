import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import LongContent from '@/components/typing/long/Content';
import PracticeLongTyping from '@/components/typing/long/Practice';
import type { LongTypingDetail } from '@/types/typing';

export default function LongTypingPage() {
  const router = useRouter();

  const [data, setData] = useState<LongTypingDetail | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const getLongTyping = async ({
    typingId,
    pageNum,
    isTyping,
  }: {
    typingId: string;
    pageNum: string;
    isTyping: string;
  }) => {
    const { result } = await getLongTypingAPI({ typingId, pageNum });
    setData(result);
    setIsTyping(isTyping === 'true');
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { typingId, pageNum, isTyping } = router.query as { typingId: string; pageNum: string; isTyping: string };
    getLongTyping({ typingId, pageNum, isTyping });
  }, [router.isReady, router.asPath]);

  // TODO: 로딩창
  if (!router.isReady || !data) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      {isTyping ? <PracticeLongTyping {...data} /> : <LongContent {...data} />}
      <Footer />
    </>
  );
}

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingAPI } from '@/apis/typing';
import LongContent from '@/components/practice/long/Content';
import PracticeLongTyping from '@/components/practice/long/Typing';
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
    if (!router.isReady) return;
    const { typingId, pageNum, isTyping } = router.query as { typingId: string; pageNum: string; isTyping: string };
    getLongTyping({ typingId, pageNum, isTyping });
  }, [router.isReady]);

  return <>{data ? isTyping ? <PracticeLongTyping {...data} /> : <LongContent {...data} /> : <div>로딩 중</div>}</>;
}

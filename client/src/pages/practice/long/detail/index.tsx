import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingAPI } from '@/apis/typing';
import LongContent from '@/components/typing/long/Content';
import PracticeLongTyping from '@/components/typing/long/Typing';
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

  const initLongTyping = () => {
    setData(null);
    setIsTyping(false);
  };

  // 페이지 이동시 해당 컴포넌트는 새롭게 렌더링이 되지 않고 리렌더링이 된다.
  // 그렇기 때문에 url이 바뀔 때 상태를 초기화해주어 자식컴포넌트들이 새롭게 렌더링되도록 초기화해준다.
  useEffect(() => {
    initLongTyping();
  }, [router.asPath]);

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

  return <>{isTyping ? <PracticeLongTyping {...data} /> : <LongContent {...data} />}</>;
}

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ExamLongTyping from '@/components/typing/long/Exam';
import useUserProfile from '@/hooks/useUserProfile';
import type { LongTypingDetail } from '@/types/typing';

export default function ExamLongTypingPage() {
  const router = useRouter();
  const userProfile = useUserProfile(router.asPath);

  const [data, setData] = useState<LongTypingDetail | null>(null);

  const getLongTyping = async () => {
    const { result } = await getLongTypingAPI({ typingId: '1', pageNum: '1' });
    setData(result);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // // 사용자 로그인 상태가 아니라면 로그인 페이지로 리다이렉트 또는 사용할 수 없다 표시
    // if (!userProfile) {
    //   router.replace('/login');
    // }
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

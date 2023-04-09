import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { examLongTypingAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ExamLongTyping from '@/components/typing/long/Exam';
import { LOGIN_PATH, MAIN_PATH } from '@/constants/paths';
import type { ApiErrorResponse } from '@/types/apiResponse';
import type { LongTypingDetail } from '@/types/typing';

export default function ExamLongTypingPage() {
  const router = useRouter();

  const [data, setData] = useState<LongTypingDetail | null>(null);

  const getLongTyping = async (language: string) => {
    try {
      const { result } = await examLongTypingAPI(language);
      setData(result);
    } catch (error) {
      const customError = error as ApiErrorResponse;
      if (customError.code === 400) {
        router.replace(LOGIN_PATH);
      }
      router.replace(MAIN_PATH);
    }
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

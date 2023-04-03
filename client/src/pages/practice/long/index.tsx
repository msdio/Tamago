import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingListAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import PracticeLongList from '@/components/practice/long/List';
import type { LongTypingItem } from '@/types/typing';

export default function PracticeLongPage() {
  const router = useRouter();

  const [data, setData] = useState<{ currentPage: number; totalPage: number; longTypings: LongTypingItem[] } | null>(
    null,
  );

  const getLongTypingList = async (page = 1) => {
    const { result } = await getLongTypingListAPI(page);

    const { totalPage, longTypings } = result;

    setData({ currentPage: page, totalPage, longTypings });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { page } = router.query as { page?: number };

    getLongTypingList(page);
  }, [router.isReady, router.asPath]);

  if (!router.isReady || !data) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      <PracticeLongList currentPage={data.currentPage} totalPage={data.totalPage} typingList={data.longTypings} />
      <Footer />
    </>
  );
}

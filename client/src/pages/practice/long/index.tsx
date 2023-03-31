import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingListAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import PracticeLongList from '@/components/practice/long/List';
import type { LongTypingItem } from '@/types/typing';

export default function PracticeLongPage() {
  const router = useRouter();

  const [data, setData] = useState<{ currentPage: number; totalPage: number; longTypingList: LongTypingItem[] } | null>(
    null,
  );

  const getLongTypingList = async (page = '1') => {
    const { result } = await getLongTypingListAPI(page);

    const { currentPage, totalPage, longTypingList } = result;

    console.log(result);

    setData({ currentPage, totalPage, longTypingList });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { page } = router.query as { page?: string };

    getLongTypingList(page);
  }, [router.isReady, router.asPath]);

  if (!router.isReady || !data) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <Header />
      <PracticeLongList currentPage={data.currentPage} totalPage={data.totalPage} typingList={data.longTypingList} />
      <Footer />
    </>
  );
}

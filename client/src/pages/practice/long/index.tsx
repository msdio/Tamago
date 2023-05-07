import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getLongTypingListAPI } from '@/apis/typing';
import Footer from '@/components/footer';
import Header from '@/components/header';
import PracticeLongList from '@/components/typing/long/List';
import type { LongTypingItem } from '@/types/typing';

export default function PracticeLongPage() {
  const router = useRouter();

  const [data, setData] = useState<{ currentPage: number; totalPage: number; longTypings: LongTypingItem[] } | null>(
    null,
  );

  const getLongTypingList = async ({ page, sortBy }: { page: number; sortBy?: string }) => {
    const { result } = await getLongTypingListAPI({ page, sortBy });

    const { totalPage, longTypings } = result as { totalPage: number; longTypings: LongTypingItem[] };

    setData({ currentPage: page, totalPage, longTypings });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { page, sortBy } = router.query as { page: string; sortBy?: string };

    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
    getLongTypingList({ page: pageNumber, sortBy });
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

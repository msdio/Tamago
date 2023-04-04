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

  const getLongTypingList = async (page: number) => {
    const { result } = await getLongTypingListAPI(page);

    const { totalPage, longTypings } = result;

    setData({ currentPage: page, totalPage, longTypings });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { page } = router.query as { page?: string }; /* page: number로 한다고 숫자에서 문자열로 변환 X */

    getLongTypingList(isNaN(Number(page)) ? 1 : Number(page));
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

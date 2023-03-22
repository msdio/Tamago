import { useEffect, useState } from 'react';

import { getLongTypingListAPI } from '@/apis/typing';
import PracticeLongList from '@/components/practice/long/List';
import type { LongTypingItem } from '@/types/typing';

export default function PracticeLongPage() {
  const [data, setData] = useState<LongTypingItem[]>([]);

  const getLongTypingList = async () => {
    const { result } = await getLongTypingListAPI();

    setData(result);
  };

  useEffect(() => {
    getLongTypingList();
  }, []);

  return <PracticeLongList typingList={data} />;
}

import { useEffect, useState } from 'react';

import type { ShortTypingResponseType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import PracticeShort from '@/components/practice/short';

// interface PracticeShortPageProps {
//   data: ShortTypingResponseType;
// }

export default function PracticeShortPage() {
  const [data, setData] = useState<ShortTypingResponseType>({
    typingWritings: [],
    contentType: '0',
    typingsType: 'practice',
  });

  const getTypingWritings = async () => {
    const data = await getShortTypingWritingsAPI();

    setData(data);
  };

  useEffect(() => {
    getTypingWritings();
  }, []);

  return (
    <>
      <PracticeShort {...data} />
    </>
  );
}

// export async function getServerSideProps() {
//   const data = await getShortTypingWritingsAPI();

//   return { props: { data } };
// }

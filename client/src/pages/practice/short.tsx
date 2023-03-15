import { useEffect, useState } from 'react';

import type { ShortTypingResultType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import PracticeShort from '@/components/practice/short';
import ShortTypingProvider from '@/components/practice/short/shortTypingContext';

const INIT_LANG = 'korean';

export default function PracticeShortPage() {
  const [data, setData] = useState<ShortTypingResultType>({
    typingWritings: [],
    contentType: '0',
    typingsType: 'practice',
  });

  const getTypingWritings = async () => {
    const { result } = await getShortTypingWritingsAPI(INIT_LANG);

    setData(result);
  };

  useEffect(() => {
    getTypingWritings();
  }, []);

  // TODO: error page
  if (!data) <>error</>;

  return (
    <ShortTypingProvider typingWritings={data.typingWritings}>
      <PracticeShort />;
    </ShortTypingProvider>
  );
}

// export async function getServerSideProps() {
//   const data = await getShortTypingWritingsAPI();

//   return { props: { data } };
// }

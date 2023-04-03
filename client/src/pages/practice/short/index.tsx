import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import type { ShortTypingResultType, TypingLanguageType } from '@/apis/typing';
import { getShortTypingWritingsAPI } from '@/apis/typing';
import PracticeShort from '@/components/typing/short';
import ShortTypingProvider from '@/components/typing/short/_hook/contextShortTyping';
import useToggle from '@/hooks/useToggle';

export default function PracticeShortPage() {
  const router = useRouter();
  const { language } = router.query;

  const [isLoading, toggleLoading] = useToggle();

  const [data, setData] = useState<ShortTypingResultType>({
    typingWritings: [],
    contentType: '0',
    typingsType: 'practice',
  });

  const getTypingWritings = useCallback(async () => {
    if (language) {
      toggleLoading();
      const { result } = await getShortTypingWritingsAPI(language as TypingLanguageType);

      setData(result);
      toggleLoading();
    }
  }, [language, toggleLoading]);
  useEffect(() => {
    getTypingWritings();
  }, [getTypingWritings]);

  // TODO: error page or loading page
  if (!data || isLoading) <>로딩중</>;

  return (
    <ShortTypingProvider originalTypings={data.typingWritings}>
      <PracticeShort />;
    </ShortTypingProvider>
  );
}

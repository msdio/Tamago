import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import type { ShortTypingResultType, TypingLanguageType } from '@/apis/typing';
import { getExamShortTypingWritingsAPI } from '@/apis/typing';
import CheckedLayout from '@/components/common/CheckedLayout';
import ShortTypingProvider from '@/components/typing/short/_hook/contextShortTyping';
import ActualShort from '@/components/typing/short/ActualShort';
import { TYPING_MODE } from '@/constants/typing';
import useToggle from '@/hooks/useToggle';

export default function ActualShortPage() {
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
      const { result } = await getExamShortTypingWritingsAPI(language as TypingLanguageType);

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
    <ShortTypingProvider originalTypings={data.typingWritings} mode={TYPING_MODE.ACTUAL}>
      <CheckedLayout>
        <ActualShort originalTypings={data.typingWritings} />;
      </CheckedLayout>
    </ShortTypingProvider>
  );
}

import type { ReactNode } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import useStopwatch from '@/components/practice/short/useStopWatch';

interface ShortTypingContextType {
  time: number;
  currentWritingContent: string;
}

const ShortTypingContext = createContext<ShortTypingContextType>({});

interface ShortTypingProviderProps {
  children: ReactNode;
  typingWritings: ShortTypingType[];
}

const ShortTypingProvider = ({ children, typingWritings }: ShortTypingProviderProps) => {
  const { time, status, timePlay, timePause, timeReset } = useStopwatch();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [typingCnt, setTypingCnt] = useState(0);

  const handleEndTyping = async ({ correctWriting, input }: SubmitRequestType) => {
    // TODO : 오류 단어 체크

    const data = {
      content: input,
      time: time.second,
    };

    timeReset();

    //? NOTE: 다음 문장으로 넘어간다.
    if (currentIdx < typingWritings.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // TODO : 30문장 끝
    }
  };

  const value = {
    time: time.second,
    currentWritingContent: typingWritings[currentIdx]?.content ?? '',
  };

  return <ShortTypingContext.Provider value={value}>{children}</ShortTypingContext.Provider>;
};

export function useShortTypingContext() {
  const value = useContext(ShortTypingContext);
  if (value === null) {
    throw new Error('useShortTypingContext should be used within InterviewApplicantsProvider');
  }

  return value;
}

export default ShortTypingProvider;

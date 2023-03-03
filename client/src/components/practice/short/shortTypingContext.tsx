import type { ReactNode } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import useStopwatch from '@/components/practice/short/useStopWatch';

export interface SubmitRequestType {
  input: string;
}

interface ShortTypingContextType {
  time: number;
  currentWritingContent: string;
}

interface ShortTypingHandlerContextType {
  onStartTyping: () => void;
  onEndTyping: (input: string) => Promise<void>;
}

const ShortTypingContext = createContext<ShortTypingContextType | null>(null);
const ShortTypingHandlerContext = createContext<ShortTypingHandlerContextType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  typingWritings: ShortTypingType[];
}

const ShortTypingProvider = ({ children, typingWritings }: ShortTypingProviderProps) => {
  const { time, status, timePlay, timePause, timeReset } = useStopwatch();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [typingCnt, setTypingCnt] = useState(0);

  const handleStartTyping = () => {
    if (status === 'play') return;
    timePlay();
  };

  const handleSubmit = () => {
    // TODO : error word를 잡는것은 서버에 보낼때만 하면 된다, 이전에는 값이 틀린지 아닌지만 체크하면 된다.
  };

  const handleEndTyping = async (input: string) => {
    console.log('handleEndTyping: ', input);

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

  const values = {
    time: time.second,
    currentWritingContent: typingWritings[currentIdx]?.content ?? '',
  };

  const actions = {
    onStartTyping: handleStartTyping,
    onEndTyping: handleEndTyping,
  };

  return (
    <ShortTypingContext.Provider value={values}>
      <ShortTypingHandlerContext.Provider value={actions}>{children}</ShortTypingHandlerContext.Provider>
    </ShortTypingContext.Provider>
  );
};

export function useShortTypingContext() {
  const value = useContext(ShortTypingContext);
  if (value === null) {
    throw new Error('useShortTypingContext should be used within ShortTypingProvider');
  }

  return value;
}

export function useShortTypingHandlerContext() {
  const value = useContext(ShortTypingHandlerContext);
  if (value === null) {
    throw new Error('useShortTypingHandlerContext should be used within ShortTypingHandlerProvider');
  }

  return value;
}

export default ShortTypingProvider;

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import useCurrentTyping from '@/components/practice/short/useCurrentTyping';

interface ShortTypingContextType {
  originalTyping: string;
  userTyping: string;

  time: number;
  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;

  prevUserTyping: string;
  prevOriginalTyping: string;
  nextOriginalTyping: string;
}

interface ShortTypingHandlerContextType {
  onEndTyping: (input: string) => Promise<void>;
  onBackspace: (userTyping: string) => void;
  onTyping: (inputChar: string) => void;
}

const ShortTypingContext = createContext<ShortTypingContextType | null>(null);
const ShortTypingHandlerContext = createContext<ShortTypingHandlerContextType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  originalTypings: ShortTypingType[];
}

const ShortTypingProvider = ({ children, originalTypings }: ShortTypingProviderProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const prevUserTyping = useRef('');
  const {
    originalTyping,
    userTyping,
    time,
    typingCount,
    typingAccuracy,
    typingWpm,
    handleBackspace,
    handleTypingSubmit,
    handleTyping,
  } = useCurrentTyping(
    originalTypings[currentIdx] ?? {
      typingId: 0,
      content: '',
    },
  );

  const prevOriginalTyping = useMemo(
    () => (currentIdx > 0 ? originalTypings[currentIdx - 1]?.content : ''),
    [currentIdx, originalTypings],
  );

  const nextOriginalTyping = useMemo(
    () => (currentIdx < originalTypings.length - 1 ? originalTypings[currentIdx + 1].content : ''),
    [currentIdx, originalTypings],
  );

  const handleSubmit = async (input: string) => {
    await handleTypingSubmit(input);

    prevUserTyping.current = input;
  };

  const handleEndTyping = async (input: string) => {
    await handleSubmit(input);

    if (currentIdx < originalTypings.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // TODO : 30문장 끝
    }
  };

  const values = {
    originalTyping,
    userTyping,
    time: time,
    typingCount: typingCount,
    typingWpm,
    typingAccuracy,
    prevUserTyping: prevUserTyping.current,
    prevOriginalTyping,
    nextOriginalTyping,
  };

  const actions = {
    onEndTyping: handleEndTyping,
    onBackspace: handleBackspace,
    onTyping: handleTyping,
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

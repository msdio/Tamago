import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import useCurrentTyping from '@/components/practice/short/currentTypingContext';

interface ShortTypingContextType {
  time: number;
  originalWriting: string;

  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;

  prevWritingInput: string;
  prevWritingCorrect: string;
  nextWritingContent: string;
}

interface ShortTypingHandlerContextType {
  onEndTyping: (input: string) => Promise<void>;

  onBackspace: () => void;
  onTyping: (inputChar: string) => void;
}

const ShortTypingContext = createContext<ShortTypingContextType | null>(null);
const ShortTypingHandlerContext = createContext<ShortTypingHandlerContextType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  typingWritings: ShortTypingType[];
}

const ShortTypingProvider = ({ children, typingWritings }: ShortTypingProviderProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const prevWritingInput = useRef('');
  const {
    originalWriting,
    time,
    typingCount,
    typingAccuracy,
    typingWpm,
    handleBackspace,
    handleTypingSubmit,
    handleTyping,
  } = useCurrentTyping(
    typingWritings[currentIdx] ?? {
      typingId: 0,
      content: '',
    },
  );

  const prevWritingCorrect = useMemo(
    () => (currentIdx > 0 ? typingWritings[currentIdx - 1]?.content : ''),
    [currentIdx, typingWritings],
  );

  const nextWritingContent = useMemo(
    () => (currentIdx < typingWritings.length - 1 ? typingWritings[currentIdx + 1].content : ''),
    [currentIdx, typingWritings],
  );

  const handleSubmit = async (input: string) => {
    prevWritingInput.current = input;

    handleTypingSubmit(input);
  };

  const handleEndTyping = async (input: string) => {
    await handleSubmit(input);

    if (currentIdx < typingWritings.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // TODO : 30문장 끝
    }
  };

  const values = {
    time: time,
    typingCount: typingCount,
    typingWpm,
    typingAccuracy,
    originalWriting,
    prevWritingInput: prevWritingInput.current,
    prevWritingCorrect,
    nextWritingContent,
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

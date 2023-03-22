import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import useCurrentTyping from '@/components/practice/short/_hook/useCurrentTyping';

interface ContextShortTypingType {
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

interface ContextShortTypingHandlerType {
  onEndTyping: (input: string) => Promise<void>;
  onTyping: (inputChar: string) => void;
}

const ContextShortTyping = createContext<ContextShortTypingType | null>(null);
const ContextShortTypingHandler = createContext<ContextShortTypingHandlerType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  originalTypings: ShortTypingType[];
}

const ShortTypingProvider = ({ children, originalTypings }: ShortTypingProviderProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const prevUserTyping = useRef('');
  const { originalTyping, userTyping, time, typingCount, typingAccuracy, typingWpm, handleTypingSubmit, handleTyping } =
    useCurrentTyping(
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
    onTyping: handleTyping,
  };

  return (
    <ContextShortTyping.Provider value={values}>
      <ContextShortTypingHandler.Provider value={actions}>{children}</ContextShortTypingHandler.Provider>
    </ContextShortTyping.Provider>
  );
};

export function useContextShortTyping() {
  const value = useContext(ContextShortTyping);
  if (value === null) {
    throw new Error('useContextShortTyping should be used within ShortTypingProvider');
  }

  return value;
}

export function useContextShortTypingHandler() {
  const value = useContext(ContextShortTypingHandler);
  if (value === null) {
    throw new Error('useContextShortTypingHandler should be used within ShortTypingHandlerProvider');
  }

  return value;
}

export default ShortTypingProvider;

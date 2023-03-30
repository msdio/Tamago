import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import useCurrentTyping from '@/components/practice/short/_hook/useCurrentTyping';
import type { TypingResultType } from '@/types/typing';

interface TypingHistoryType extends TypingResultType {
  content: string;
}

interface ContextShortTypingType {
  originalTyping: string;
  userTyping: string;

  time: number;
  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;
  typingSpeed: number;

  prevUserTyping: string;
  prevOriginalTyping: string;
  nextOriginalTyping: string;
}

interface ContextShortTypingHandlerType {
  onEndTyping: (input: string) => Promise<void>;
  onTyping: (inputChar: string) => void;

  timePlay: () => void;
  timePause: () => void;
}

interface ContextTypingResultModalType {
  isResultModalOpen: boolean;
  handleResultModalOpen: () => void;
  handleResultModalClose: () => void;
}

const ContextShortTyping = createContext<ContextShortTypingType | null>(null);
const ContextShortTypingHandler = createContext<ContextShortTypingHandlerType | null>(null);
const ContextTypingResultModal = createContext<ContextTypingResultModalType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  originalTypings: ShortTypingType[];
}

const ShortTypingProvider = ({ children, originalTypings }: ShortTypingProviderProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const prevUserTyping = useRef('');

  // const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const {
    originalTyping,
    userTyping,
    time,
    typingCount,
    typingAccuracy,
    typingWpm,
    typingSpeed,
    handleTypingSubmit,
    handleTyping,
    timePlay,
    timePause,
  } = useCurrentTyping(
    originalTypings[currentIdx] ?? {
      typingId: 0,
      content: '',
    },
  );

  const history = useRef<TypingHistoryType[]>([]);

  const saveTypingHistory = useCallback(
    (content: string) => {
      history.current = [...history.current, { typingSpeed, typingAccuracy, typingWpm, typingTime: time, content }];
    },
    [time, typingAccuracy, typingSpeed, typingWpm],
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
    saveTypingHistory(input);

    // TODO : saveTypingHistory 로 대체하기
    prevUserTyping.current = input;
  };

  const handleEndTyping = async (input: string) => {
    await handleSubmit(input);

    if (currentIdx < originalTypings.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // TODO : 30문장 끝, 백엔드 api가 처리되고 수정할 예정
    }
  };

  // const handleResultModalOpen = () => {
  //   setIsResultModalOpen(true);
  // };

  // const handleResultModalClose = () => {
  //   setIsResultModalOpen(false);
  // };

  const values = {
    originalTyping,
    userTyping,
    time,
    typingCount,
    typingWpm,
    typingAccuracy,
    typingSpeed,
    prevUserTyping: prevUserTyping.current,
    prevOriginalTyping,
    nextOriginalTyping,
  };

  const actions = {
    onEndTyping: handleEndTyping,
    onTyping: handleTyping,
    timePlay,
    timePause,
  };

  // const modalValues = {
  //   isResultModalOpen,
  //   handleResultModalClose,
  //   handleResultModalOpen,
  // };

  return (
    <ContextShortTyping.Provider value={values}>
      <ContextShortTypingHandler.Provider value={actions}>
        {children}
        {/* <ContextTypingResultModal.Provider value={modalValues}></ContextTypingResultModal.Provider> */}
      </ContextShortTypingHandler.Provider>
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

// export function useContextTypingResultModal() {
//   const value = useContext(ContextTypingResultModal);
//   if (value === null) {
//     throw new Error('useContextTypingResultModal should be used within ShortTypingHandlerProvider');
//   }

//   return value;
// }

export default ShortTypingProvider;

import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import Confirm from '@/components/common/Confirm';
import ResultModal from '@/components/common/ResultModal/practice-mode';
import useCurrentTyping from '@/components/practice/short/_hook/useCurrentTyping';
import useToggle from '@/hooks/useToggle';
import type { TypingResultType } from '@/types/typing';
import { INIT_TYPING_RESULT } from '@/types/typing';

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

  typingAvgResult: TypingResultType;
}

interface ContextShortTypingHandlerType {
  onEndTyping: (input: string) => Promise<void>;
  onTyping: (inputChar: string) => void;

  handleExitModalOpen: () => void;
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

  const [isResultModalOpen, handleResultModalToggle] = useToggle();
  const [isExitModalOpen, handleExitModalToggle] = useToggle();

  const history = useRef<TypingHistoryType[]>([]);

  const typingAvgResult: TypingResultType =
    history.current.length === 0
      ? INIT_TYPING_RESULT
      : {
          typingSpeed: history.current.reduce((acc, cur) => acc + cur.typingSpeed, 0) / history.current.length,
          typingAccuracy: history.current.reduce((acc, cur) => acc + cur.typingAccuracy, 0) / history.current.length,
          typingWpm: history.current.reduce((acc, cur) => acc + cur.typingWpm, 0) / history.current.length,
          typingTime: history.current.reduce((acc, cur) => acc + cur.typingTime, 0) / history.current.length,
        };

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

  const handleSubmit = useCallback(
    async (input: string) => {
      await handleTypingSubmit(input);
      saveTypingHistory(input);

      // TODO : saveTypingHistory 로 대체하기
      prevUserTyping.current = input;
    },
    [handleTypingSubmit, saveTypingHistory],
  );

  const handleEndTyping = useCallback(
    async (input: string) => {
      // NOTE: 짧은글에서는 데이터를 전송하는 것을 기다리지 않고, 바로 다음 문장으로 넘어가는 것이 좋을 것 같다.
      await handleSubmit(input);

      if (currentIdx < originalTypings.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        // TODO : 30문장 끝, 백엔드 api가 처리되고 수정할 예정
        // 여기서 결과 모달을 띄워야하기 때문에, 모달 관련 로직을 여기서 처리하는게 맞을 것 같음
        handleResultModalToggle();
      }
    },
    [currentIdx, handleResultModalToggle, handleSubmit, originalTypings.length],
  );

  const handleExitModalOpen = useCallback(() => {
    timePause();
    handleExitModalToggle();
  }, [handleExitModalToggle, timePause]);

  const handleExitModalClose = useCallback(() => {
    timePlay();
    handleExitModalToggle();
  }, [handleExitModalToggle, timePlay]);

  const handleResultModalOpen = useCallback(() => {
    handleExitModalToggle();
    handleResultModalToggle();
  }, [handleExitModalToggle, handleResultModalToggle]);

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
    typingAvgResult,
  };

  const actions = {
    onEndTyping: handleEndTyping,
    onTyping: handleTyping,
    handleExitModalOpen,
  };

  return (
    <ContextShortTyping.Provider value={values}>
      <ContextShortTypingHandler.Provider value={actions}>
        {children}

        <Confirm
          header={'정말로 그만 두시겠어요?'}
          isOpen={isExitModalOpen}
          onClose={handleExitModalClose}
          onAction={handleResultModalOpen}
          actionLabel='그만하기'
          closeLabel='계속하기'
        />
        <ResultModal isOpen={isResultModalOpen} onClose={handleResultModalToggle} result={typingAvgResult} />
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

export default ShortTypingProvider;

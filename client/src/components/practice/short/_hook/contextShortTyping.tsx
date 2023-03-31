import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import Confirm from '@/components/common/Confirm';
import ResultModal from '@/components/common/ResultModal/practice-mode';
import useCurrentTyping from '@/components/practice/short/_hook/useCurrentTyping';
import useToggle from '@/hooks/useToggle';
import type { TypingHistoryType, TypingResultType } from '@/types/typing';
import { getTypingHistoryAverage } from '@/utils/typing';

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
  const prevUserTyping = history.current[history.current.length - 1]?.content ?? '';

  const typingAvgResult = getTypingHistoryAverage(history.current);

  const saveTypingHistory = useCallback(
    (content: string) => {
      history.current = [
        ...history.current,
        { typingSpeed, typingAccuracy, typingWpm, typingTime: time, content, endTime: new Date() },
      ];
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
        // 여기서 결과 모달을 띄워야하기 때문에, 모달 관련 로직을 여기서 처리하는게 맞을 것 같음
        handleResultModalToggle();
      }
    },
    [currentIdx, handleResultModalToggle, handleSubmit, originalTypings.length],
  );

  // NOTE: 모달 관련된 로직들을 분리할 방법이 있을까요?
  // timePause, timePlay를 사용해야 하기떄문에 이곳에 만들었습니다.
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

  // NOTE: 객체의 크기가 커서, 알아보기 힘들다면 쪼개는 것도 좋을 것 같다.
  const values = {
    originalTyping,
    userTyping,
    time,
    typingCount,
    typingWpm,
    typingAccuracy,
    typingSpeed,
    prevUserTyping,
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
        <ResultModal
          isOpen={isResultModalOpen}
          onClose={handleResultModalToggle}
          result={typingAvgResult}
          endTime={history.current[history.current.length - 1]?.endTime ?? new Date()}
        />
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

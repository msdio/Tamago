import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import useCurrentTyping from '@/components/typing/short/_hook/useCurrentTyping';
import useToggle from '@/hooks/useToggle';
import type {
  CurrentTypingActionType,
  CurrentTypingInfoType,
  EndGameValueType,
  PrevNextTypingInfoType,
} from '@/types/shortTyping';
import type { TypingHistoryType } from '@/types/typing';
import { getTypingHistoryAverage } from '@/utils/typing';

const usePracticeShortTyping = (originalTypings: ShortTypingType[]) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const router = useRouter();

  const {
    originalTyping,
    userTyping,
    time,
    typingCount,
    typingAccuracy,
    typingWpm,
    typingSpeed,
    // handleTypingSubmit,
    handleTyping,
    timePlay,
    timePause,
    resetTypingData,
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

  const handleEndTyping = useCallback(
    async (input: string) => {
      resetTypingData();
      saveTypingHistory(input);

      if (currentIdx < originalTypings.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        handleResultModalToggle();
      }
    },
    [currentIdx, handleResultModalToggle, originalTypings.length, resetTypingData, saveTypingHistory],
  );

  const handleExitModalClose = useCallback(() => {
    timePlay();
    handleExitModalToggle();
  }, [handleExitModalToggle, timePlay]);

  const handleResultModalOpen = useCallback(() => {
    handleExitModalToggle();
    handleResultModalToggle();
  }, [handleExitModalToggle, handleResultModalToggle]);

  const handleExitModalOpen = useCallback(() => {
    timePause();
    handleExitModalToggle();
  }, [handleExitModalToggle, timePause]);

  const handleReplay = () => {
    handleResultModalToggle();
    router.reload();
  };

  const currentTypingInfos: CurrentTypingInfoType = {
    originalTyping,
    userTyping,
    typingTime: time,
    typingCount,
    typingWpm,
    typingAccuracy,
    typingSpeed,
    index: currentIdx,
  };

  const prevNextTypingInfo: PrevNextTypingInfoType = {
    prevUserTyping,
    prevOriginalTyping,
    nextOriginalTyping,
  };

  const endGameValue: EndGameValueType = {
    result: typingAvgResult,
    endTime: history.current[history.current.length - 1]?.endTime ?? new Date(),
    isExitModalOpen,
    isResultModalOpen,
    handleExitModalOpen,
    handleExitModalClose,
    handleResultModalOpen,
    handleReplay,
  };

  const currentTypingActions: CurrentTypingActionType = {
    onEndTyping: handleEndTyping,
    onTyping: handleTyping,
    onExit: handleExitModalOpen,
  };

  return {
    currentTypingInfos,
    currentTypingActions,
    endGameValue,
    prevNextTypingInfo,
  };
};

export default usePracticeShortTyping;

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
    handlePracticeSubmit,
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

  const handleSubmit = useCallback(
    async (input: string) => {
      await handlePracticeSubmit(input);
      saveTypingHistory(input);
    },
    [handlePracticeSubmit, saveTypingHistory],
  );

  const handleEndTyping = useCallback(
    async (input: string) => {
      // NOTE: 짧은글에서는 데이터를 전송하는 것을 기다리지 않고, 바로 다음 문장으로 넘어가는 것이 좋을 것 같다.
      await handleSubmit(input);

      if (currentIdx < originalTypings.length - 1) {
        resetTypingData();
        setCurrentIdx((prev) => prev + 1);
      } else {
        // 여기서 결과 모달을 띄워야하기 때문에, 모달 관련 로직을 여기서 처리하는게 맞을 것 같음
        handleResultModalToggle();
      }
    },
    [currentIdx, handleResultModalToggle, handleSubmit, originalTypings.length],
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

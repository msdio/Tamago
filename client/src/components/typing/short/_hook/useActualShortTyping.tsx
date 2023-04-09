import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useMemo, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { postExamPenalty } from '@/apis/typing';
import useCurrentTyping from '@/components/typing/short/_hook/useCurrentTyping';
import { ACTUAL_TYPING_TIME_LIMIT } from '@/constants/typing';
import useToggle from '@/hooks/useToggle';
import type { LanguageType } from '@/types/language';
import type {
  CurrentTypingActionType,
  CurrentTypingInfoType,
  EndGameValueType,
  PrevNextTypingInfoType,
} from '@/types/shortTyping';
import type { TypingHistoryType } from '@/types/typing';
import { getTypingHistoryAverage } from '@/utils/typing';

export default function useActualShortTyping(originalTypings: ShortTypingType[]) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSubmitLoading, toggleSubmitLoading] = useToggle();
  const router = useRouter();

  const {
    originalTyping,
    userTyping,
    time,
    typingCount,
    typingAccuracy,
    typingWpm,
    typingSpeed,
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

  const totalTypingTime = history.current.reduce((acc, cur) => acc + cur.typingTime, 0) + time;

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

  const handlePenaltySubmit = useCallback(async () => {
    const { language } = router.query;
    if (language) {
      toggleSubmitLoading();
      await postExamPenalty(language as LanguageType);

      // TODO: 타이머 수정
      setTimeout(() => {
        toggleSubmitLoading();
      }, 3000);
    }

    handleResultModalToggle();
  }, [handleResultModalToggle, router.query, toggleSubmitLoading]);

  const handleSubmit = () => {
    toggleSubmitLoading();

    // const res = await getTypingHistoryAPI(typingHistory);
    // TODO: 타이머 수정
    setTimeout(() => {
      toggleSubmitLoading();
    }, 3000);
  };
  const handleEndTyping = useCallback(
    async (input: string) => {
      resetTypingData();
      timePlay(); // NOTE: 바로 다시 실행

      saveTypingHistory(input);

      if (currentIdx < originalTypings.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    },
    [currentIdx, originalTypings.length, resetTypingData, saveTypingHistory, timePlay],
  );

  const handleForceEndTyping = () => {
    timePause();
    handlePenaltySubmit();
  };

  const handleExitModalClose = useCallback(() => {
    timePlay();
    handleExitModalToggle();
  }, [handleExitModalToggle, timePlay]);

  const handleResultModalOpen = useCallback(() => {
    handleExitModalToggle();
    handlePenaltySubmit();
  }, [handleExitModalToggle, handlePenaltySubmit]);

  const handleExitModalOpen = useCallback(() => {
    timePause();
    handleExitModalToggle();
  }, [handleExitModalToggle, timePause]);

  const handleReplay = () => {
    handleResultModalToggle();
    router.reload();
  };

  useEffect(() => {
    if (ACTUAL_TYPING_TIME_LIMIT.SHORT - totalTypingTime <= 0) {
      handleForceEndTyping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTypingTime]);

  const currentTypingInfos: CurrentTypingInfoType = {
    originalTyping,
    userTyping,
    typingTime: totalTypingTime,
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
    isSubmitLoading,
  };
}

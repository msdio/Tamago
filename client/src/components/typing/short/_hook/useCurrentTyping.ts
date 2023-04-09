import { disassemble } from 'hangul-js';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ShortTypingType, TypingHistoryRequest } from '@/apis/typing';
import { getTypingHistoryAPI } from '@/apis/typing';
import { CONTENT_TYPE, TYPING_MODE } from '@/constants/typing';
import useStopwatch from '@/hooks/useStopWatch';
import { getCharType } from '@/utils/char';
import {
  getTypingAccuracy,
  getTypingCount,
  getTypingSpeed,
  getTypingWpm,
  getWrongKeys,
  getWrongLength,
} from '@/utils/typing';

interface UseCurrentTypingReturns {
  originalTyping: string;
  userTyping: string;
  time: number;
  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;
  typingSpeed: number;

  timePause: () => void;
  timePlay: () => void;

  handleTyping: (userTyping: string) => void;
  handleTypingSubmit: (userTyping: string) => Promise<void>;
}

export default function useCurrentTyping({
  typingId,
  content: originalTyping,
}: ShortTypingType): UseCurrentTypingReturns {
  const { status, timePlay, timeReset, timePause, totalMillisecond, startTime } = useStopwatch();
  const [userTyping, setUserTyping] = useState('');

  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  const [typingWpm, setTypingWpm] = useState(0);

  const backspaceCount = useRef(0);
  const typingCount = getTypingCount({ originalTyping, userTyping });

  const handleTypingAccuracy = useCallback(
    (userTyping: string) => {
      const wrongLength = getWrongLength({
        originalTyping: originalTyping,
        userTyping: userTyping.slice(0, userTyping.length - 1),
      });

      const newAccuracy = getTypingAccuracy({
        typingLength: userTyping.length,
        wrongLength,
      });

      setTypingAccuracy(parseInt(String(newAccuracy), 10));
    },
    [originalTyping],
  );

  const handleTyping = useCallback(
    (input: string) => {
      setUserTyping(input);

      // NOTE : backspace 누른 경우
      if (userTyping.length > input.length) {
        backspaceCount.current += 1;

        return;
      }

      // 경과 시간 계산 시작
      if (status !== 'play') {
        timePlay();
      }

      // //? 타이핑 정확도 계산 - 오타 계산
      handleTypingAccuracy(userTyping);
    },
    [handleTypingAccuracy, status, timePlay, userTyping],
  );

  const resetTypingData = useCallback(() => {
    setTypingSpeed(() => 0);
    setTypingAccuracy(() => 0);
    setTypingWpm(() => 0);
    setUserTyping(() => '');
    backspaceCount.current = 0;

    timeReset();
  }, [timeReset]);

  const generateTypingInfo = useCallback(
    (resultContent: string) => {
      const originalInfos = [...originalTyping].map((char) => ({
        char,
        type: getCharType(char),
        components: disassemble(char),
      }));

      const typingInfos = [...resultContent].map((char) => ({
        char: '',
        type: 'other',
        components: disassemble(char),
      }));

      const typingHistory: TypingHistoryRequest = {
        contentType: CONTENT_TYPE.SHORT,
        mode: TYPING_MODE.PRACTICE,
        startTime: new Date(startTime.current as number),
        endTime: new Date(),
        wpm: typingWpm,
        wrongKeys: getWrongKeys(originalInfos, typingInfos),
        typingSpeed,
        typingAccuracy,
        resultContent,
        typingId,
      };

      return typingHistory;
    },
    [originalTyping, startTime, typingAccuracy, typingId, typingSpeed, typingWpm],
  );

  const handleSubmit = useCallback(
    async (resultContent: string) => {
      const typingHistory = generateTypingInfo(resultContent);
      await getTypingHistoryAPI(typingHistory);
      resetTypingData();
    },
    [generateTypingInfo, resetTypingData],
  );

  const handleTypingWpm = useCallback(() => {
    const newTypingWpm = getTypingWpm({
      typingCount,
      millisecond: totalMillisecond,
    });
    setTypingWpm(newTypingWpm);
  }, [totalMillisecond, typingCount]);

  const handleTypingSpeed = useCallback(() => {
    const newTypingSpeed = getTypingSpeed({
      typingCount,
      backspaceCount: backspaceCount.current,
      millisecond: totalMillisecond,
    });
    setTypingSpeed(newTypingSpeed);
  }, [totalMillisecond, typingCount]);

  useEffect(() => {
    handleTypingSpeed();
    handleTypingWpm();
  }, [handleTypingSpeed, handleTypingWpm, totalMillisecond]);

  return {
    userTyping,
    originalTyping,
    time: parseInt(String(totalMillisecond / 1000), 10),
    typingCount,
    typingWpm,
    typingAccuracy,
    typingSpeed,
    timePause,
    timePlay,
    handleTyping,
    handleTypingSubmit: handleSubmit,
  };
}

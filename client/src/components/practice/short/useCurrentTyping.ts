import { disassemble } from 'hangul-js';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { getTypingHistoryAPI } from '@/apis/typing';
import useStopwatch from '@/components/practice/short/useStopWatch';
import { getTypingCount, getWrongLength } from '@/components/practice/short/utils';
import { getCharType } from '@/utils/char';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, getWrongKeys } from '@/utils/typing';

interface UseCurrentTypingReturns {
  originalTyping: string;
  userTyping: string;
  time: number;
  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;

  handleTyping: (userTyping: string) => void;
  handleTypingSubmit: (userTyping: string) => Promise<void>;
}

export default function useCurrentTyping({
  typingId,
  content: originalTyping,
}: ShortTypingType): UseCurrentTypingReturns {
  const { time, status, timePlay, timeReset, totalMillisecond, startTime } = useStopwatch();
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
        typingLength: originalTyping.length,
        wrongLength,
      });

      setTypingAccuracy(parseInt(newAccuracy, 10));
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

      const typingHistory = {
        mode: 'PRACTICE',
        startTime: new Date(startTime.current as number),
        endTime: new Date(),
        typingSpeed,
        typingAccuracy,
        wpm: typingWpm,
        resultContent,
        typingId,
        wrongKeys: getWrongKeys(originalInfos, typingInfos),
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
      millisecond: time.minute * 60 * 1000 + time.second * 1000 + time.ms,
    });
    setTypingWpm(newTypingWpm);
  }, [time.minute, time.ms, time.second, typingCount]);

  const handleTypingSpeed = useCallback(() => {
    const newTypingSpeed = getTypingSpeed({
      typingCount,
      backspaceCount: backspaceCount.current,
      millisecond: time.minute * 60 * 1000 + time.second * 1000 + time.ms,
    });
    setTypingSpeed(newTypingSpeed);
  }, [time.minute, time.ms, time.second, typingCount]);

  useEffect(() => {
    handleTypingSpeed();
    handleTypingWpm();
  }, [handleTypingSpeed, handleTypingWpm]);

  return {
    userTyping,
    originalTyping,
    time: parseInt(String(totalMillisecond / 1000), 10),
    typingCount,
    typingWpm,
    typingAccuracy,
    handleTyping,
    handleTypingSubmit: handleSubmit,
  };
}

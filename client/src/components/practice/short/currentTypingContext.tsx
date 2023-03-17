import { disassemble } from 'hangul-js';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { getTypingHistoryAPI } from '@/apis/typing';
import useStopwatch from '@/components/practice/short/useStopWatch';
import { getWrongLength } from '@/components/practice/short/utils';
import { getCharType } from '@/utils/char';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, getWrongKeys } from '@/utils/typing';

interface UseCurrentTypingReturns {
  time: number;
  originalTyping: string;

  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;

  handleBackspace: () => void;
  handleTyping: (userTyping: string) => void;
  handleTypingSubmit: (userTyping: string) => Promise<void>;
}

export default function useCurrentTyping({
  typingId,
  content: originalTyping,
}: ShortTypingType): UseCurrentTypingReturns {
  const { time, status, timePlay, timeReset, totalMillisecond, startTime } = useStopwatch();

  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  const [typingWpm, setTypingWpm] = useState(0);

  const backspaceCount = useRef(0);
  const typingCount = useRef(0); // 타수, 현재 입력한 글의 타수

  // typingCount : 정답인 글쇠의 개수
  // 안녕하 --> 8 // 하 / 아 -> x
  const handleBackspace = useCallback(() => {
    typingCount.current = typingCount.current >= 2 ? typingCount.current - 2 : 0; // backspace시 타수 -2?
    backspaceCount.current += 1;
  }, []);

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
    (userTyping: string) => {
      // 경과 시간 계산 시작
      if (status !== 'play') {
        timePlay();
      }

      typingCount.current += 1; // 글쇠 1개당 1타
      // //? 타이핑 정확도 계산 - 오타 계산
      handleTypingAccuracy(userTyping);
    },
    [handleTypingAccuracy, status, timePlay],
  );

  const resetTypingData = useCallback(() => {
    setTypingSpeed(() => 0);
    setTypingAccuracy(() => 0);
    setTypingWpm(() => 0);
    backspaceCount.current = 0;
    typingCount.current = 0;

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
      typingCount: typingCount.current,
      millisecond: time.minute * 60 * 1000 + time.second * 1000 + time.ms,
    });
    setTypingWpm(newTypingWpm);
  }, [time.minute, time.ms, time.second]);

  const handleTypingSpeed = useCallback(() => {
    // NOTE : 타수 계산 방법이 이상한것 같습니다.
    const newTypingSpeed = getTypingSpeed({
      typingCount: typingCount.current,
      backspaceCount: backspaceCount.current,
      millisecond: time.minute * 60 * 1000 + time.second * 1000 + time.ms,
    });
    setTypingSpeed(newTypingSpeed);
  }, [time.minute, time.ms, time.second]);

  useEffect(() => {
    handleTypingSpeed();
    handleTypingWpm();
  }, [handleTypingSpeed, handleTypingWpm]);

  return {
    time: parseInt(String(totalMillisecond / 1000), 10),
    originalTyping,
    typingCount: typingCount.current,
    typingWpm,
    typingAccuracy,
    handleBackspace,
    handleTyping,
    handleTypingSubmit: handleSubmit,
  };
}

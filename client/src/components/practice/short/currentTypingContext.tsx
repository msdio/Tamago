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
  originalWriting: string;

  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;

  handleBackspace: () => void;
  handleTyping: (input: string) => void;
  handleTypingSubmit: (inputWriting: string) => Promise<void>;
}

export default function useCurrentTyping({
  typingId,
  content: originalWriting,
}: ShortTypingType): UseCurrentTypingReturns {
  const { status, timePlay, timeReset, totalMillisecond, startTime } = useStopwatch();

  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  const [typingWpm, setTypingWpm] = useState(0);

  const backspaceCount = useRef(0);
  const typingCount = useRef(0); // 타수, 현재 입력한 글의 타수

  const handleBackspace = useCallback(() => {
    typingCount.current = typingCount.current >= 2 ? typingCount.current - 2 : 0; // backspace시 타수 -2?
    backspaceCount.current += 1;
  }, []);

  const handleTypingAccuracy = useCallback(
    (inputWriting: string) => {
      const wrongLength = getWrongLength({
        originalWriting,
        inputWriting: inputWriting.slice(0, inputWriting.length - 1),
      });

      const newAccuracy = getTypingAccuracy({
        typingLength: originalWriting.length,
        wrongLength,
      });

      setTypingAccuracy(parseInt(newAccuracy, 10));
    },
    [originalWriting],
  );

  // NOTE: backspace 경우는 이전에 처리
  const handleTyping = useCallback(
    (input: string) => {
      // 경과 시간 계산 시작
      if (status !== 'play') {
        timePlay();
      }

      typingCount.current += 1; // 글쇠 1개당 1타
      // //? 타이핑 정확도 계산 - 오타 계산
      handleTypingAccuracy(input);
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

  const handleSubmit = useCallback(
    async (inputWriting: string) => {
      const resultContent = inputWriting;
      const originalInfos = [...originalWriting].map((char) => ({
        char,
        type: getCharType(char),
        components: disassemble(char),
      }));
      const typingInfos = [...resultContent].map((char) => ({
        char: '',
        type: 'other',
        components: disassemble(char),
      }));

      if (startTime.current !== null) {
        const typingHistory = {
          mode: 'PRACTICE',
          startTime: new Date(startTime.current),
          endTime: new Date(),
          typingSpeed,
          typingAccuracy,
          wpm: typingWpm,
          resultContent,
          typingId,
          wrongKeys: getWrongKeys(originalInfos, typingInfos),
        };

        await getTypingHistoryAPI(typingHistory);
      }

      resetTypingData();
    },
    [originalWriting, resetTypingData, startTime, typingAccuracy, typingId, typingSpeed, typingWpm],
  );

  const handleTypingWpm = useCallback(() => {
    const newTypingWpm = getTypingWpm({
      typingCount: typingCount.current,
      millisecond: totalMillisecond,
    });
    setTypingWpm(newTypingWpm);
  }, [totalMillisecond]);

  const handleTypingSpeed = useCallback(() => {
    // NOTE : 타수 계산 방법이 이상한것 같습니다.
    const newTypingSpeed = getTypingSpeed({
      typingCount: typingCount.current,
      backspaceCount: backspaceCount.current,
      millisecond: totalMillisecond,
    });
    setTypingSpeed(newTypingSpeed);
  }, [totalMillisecond]);

  useEffect(() => {
    handleTypingSpeed();
    handleTypingWpm();
  }, [handleTypingSpeed, handleTypingWpm]);

  return {
    time: parseInt(String(totalMillisecond / 1000), 10),
    originalWriting,
    typingCount: typingCount.current,
    typingWpm,
    typingAccuracy,
    handleBackspace,
    handleTyping,
    handleTypingSubmit: handleSubmit,
  };
}

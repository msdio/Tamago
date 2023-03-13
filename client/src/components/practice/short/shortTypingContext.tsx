import { disassemble } from 'hangul-js';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import { getTypingHistoryAPI } from '@/apis/typing';
import useStopwatch from '@/components/practice/short/useStopWatch';
import { getWrongLength } from '@/components/practice/short/utils';
import { getCharType } from '@/utils/char';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, getWrongKeys } from '@/utils/typing';

interface ShortTypingContextType {
  time: number;
  originalWriting: string;

  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;

  prevWritingInput: string;
  prevWritingCorrect: string;
  nextWritingContent: string;
}

interface ShortTypingHandlerContextType {
  onEndTyping: (input: string) => Promise<void>;

  onBackspace: () => void;
  onTyping: (inputChar: string) => void;
}

const ShortTypingContext = createContext<ShortTypingContextType | null>(null);
const ShortTypingHandlerContext = createContext<ShortTypingHandlerContextType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  typingWritings: ShortTypingType[];
}

const ShortTypingProvider = ({ children, typingWritings }: ShortTypingProviderProps) => {
  // NOTE : state를 하나로 합칠지는 고민중.
  const { time, status, timePlay, timeReset, totalMillisecond, startTime } = useStopwatch();
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  const [typingWpm, setTypingWpm] = useState(0);
  const backspaceCount = useRef(0);
  const typingCount = useRef(0); // 타수, 현재 입력한 글의 타수

  const [currentIdx, setCurrentIdx] = useState(0);
  const prevWritingInput = useRef('');
  // name 변경
  const originalWriting = typingWritings[currentIdx]?.content ?? '';

  const prevWritingCorrect = useMemo(
    () => (currentIdx > 0 ? typingWritings[currentIdx - 1]?.content : ''),
    [currentIdx, typingWritings],
  );

  const nextWritingContent = useMemo(
    () => (currentIdx < typingWritings.length - 1 ? typingWritings[currentIdx + 1].content : ''),
    [currentIdx, typingWritings],
  );

  const handleBackspace = () => {
    typingCount.current = typingCount.current >= 2 ? typingCount.current - 2 : 0; // backspace시 타수 -2?
    backspaceCount.current += 1;
  };

  const handleTypingAccuracy = (inputWriting: string) => {
    const wrongLength = getWrongLength({
      originalWriting,
      inputWriting: inputWriting.slice(0, inputWriting.length - 1),
    });

    const newAccuracy = getTypingAccuracy({
      typingLength: originalWriting.length,
      wrongLength,
    });

    setTypingAccuracy(parseInt(newAccuracy, 10));
  };

  // NOTE: backspace 경우는 이전에 처리
  const handleTyping = (input: string) => {
    // 경과 시간 계산 시작
    if (status !== 'play') {
      timePlay();
    }

    typingCount.current += 1; // 글쇠 1개당 1타
    // //? 타이핑 정확도 계산 - 오타 계산
    handleTypingAccuracy(input);
  };

  const handleSubmit = async (input: string) => {
    prevWritingInput.current = input;
    const resultContent = input;
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
        typingId: typingWritings[currentIdx].typingId,
        wrongKeys: getWrongKeys(originalInfos, typingInfos),
      };

      await getTypingHistoryAPI(typingHistory);
    }
  };

  const resetTypingData = () => {
    setTypingSpeed(() => 0);
    setTypingAccuracy(() => 0);
    setTypingWpm(() => 0);
    backspaceCount.current = 0;
    typingCount.current = 0;

    timeReset();
  };

  const handleEndTyping = async (input: string) => {
    await handleSubmit(input);

    resetTypingData();
    //? NOTE: 다음 문장으로 넘어간다.
    if (currentIdx < typingWritings.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // TODO : 30문장 끝
    }
  };

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

  const values = {
    time: time.second,
    typingCount: typingCount.current,
    prevWritingInput: prevWritingInput.current,
    originalWriting,
    typingAccuracy,
    typingWpm,
    prevWritingCorrect,
    nextWritingContent,
  };

  const actions = {
    onEndTyping: handleEndTyping,
    onBackspace: handleBackspace,
    onTyping: handleTyping,
  };

  return (
    <ShortTypingContext.Provider value={values}>
      <ShortTypingHandlerContext.Provider value={actions}>{children}</ShortTypingHandlerContext.Provider>
    </ShortTypingContext.Provider>
  );
};

export function useShortTypingContext() {
  const value = useContext(ShortTypingContext);
  if (value === null) {
    throw new Error('useShortTypingContext should be used within ShortTypingProvider');
  }

  return value;
}

export function useShortTypingHandlerContext() {
  const value = useContext(ShortTypingHandlerContext);
  if (value === null) {
    throw new Error('useShortTypingHandlerContext should be used within ShortTypingHandlerProvider');
  }

  return value;
}

export default ShortTypingProvider;

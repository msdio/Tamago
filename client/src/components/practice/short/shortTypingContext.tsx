import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

import type { ShortTypingType, TypingHistoryRequest } from '@/apis/typing';
import useStopwatch from '@/components/practice/short/useStopWatch';
import { calcAccuracy, calcTypingSpeed } from '@/utils/typing';

export interface SubmitRequestType {
  input: string;
}

interface ShortTypingContextType {
  time: number;
  currentWritingContent: string;
  typingCount: number;
  typingSpeed: number;
  typingAccuracy: number;
}

interface ShortTypingHandlerContextType {
  onStartTyping: () => void;
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
  const { time, status, timePlay, timePause, timeReset } = useStopwatch();
  const [typingCount, setTypingCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  const backspaceCount = useRef(0);

  const [currentIdx, setCurrentIdx] = useState(0);

  const currentWritingContent = typingWritings[currentIdx]?.content ?? '';
  const handleStartTyping = () => {
    return;
    timePlay();
  };

  const handleTypingSpeed = () => {
    const newTypingSpeed = calcTypingSpeed({
      typingCount,
      backspaceCount: backspaceCount.current,
      elapsedTime: time.second,
    });
    setTypingSpeed(newTypingSpeed);
  };

  const handleTypingAccuracy = (inputWriting: string) => {
    const newAccuracy = calcAccuracy({ inputWriting, correctWriting: currentWritingContent });
    setTypingAccuracy(newAccuracy);
  };

  const handleBackspace = () => {
    backspaceCount.current += 1;
  };

  const handleTyping = (input: string) => {
    // 경과 시간 계산 시작
    if (status !== 'play') {
      timePlay();
    }

    //? NOTE: 한글, 영타 구분?, 타자수 계산
    setTypingCount((prev) => prev + 1);
    //? 타이핑 속도 계산
    handleTypingSpeed();
    //? 타이핑 정확도 계산 - 오타 계산
    handleTypingAccuracy(input);
  };

  const handleSubmit = async (input: string) => {
    // TODO : error word를 잡는것은 서버에 보낼때만 하면 된다, 이전에는 값이 틀린지 아닌지만 체크하면 된다.

    const data: TypingHistoryRequest = {
      content: currentWritingContent,
      resultContent: input,
      elapsedTime: time.second, // 초 단위!
      typingId: '1231',
      contentType: 0, // 1: 긴글?, 0: 짧은 글
      contentLength: 24, // 타이핑한 짧은 글 글자 길이 = 총글자수
      pageInfo: null, // 짧은 글일 경우 NULL
      endTime: new Date(),
      language: 'Korean', // 언어 종류
      typingMode: 'practice',
      typingSpeed,
      typingAccuracy: 98,
      wrongKeys: [],
    };

    console.log(data);
  };

  const handleEndTyping = async (input: string) => {
    await handleSubmit(input);

    // TODO : 오류 단어 체크

    timeReset();

    //? NOTE: 다음 문장으로 넘어간다.
    if (currentIdx < typingWritings.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // TODO : 30문장 끝
    }
  };

  const values = {
    time: time.second,
    currentWritingContent,
    typingAccuracy,
    typingCount,
    typingSpeed,
  };

  const actions = {
    onStartTyping: handleStartTyping,
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

import { useEffect, useRef, useState } from 'react';

interface TimeType {
  ms: number;
  second: number;
  minute: number;
  hour: number;
}

const initState: TimeType = {
  ms: 0,
  second: 0,
  minute: 0,
  hour: 0,
};

interface UseStopWatchReturns {
  time: TimeType;
  status: 'play' | 'stop' | 'pause';
  timePlay: () => void;
  timePause: () => void;
  timeReset: () => void;
  totalMillisecond: number;
  startTime: React.MutableRefObject<number | null>;
}

const useStopwatch = (): UseStopWatchReturns => {
  const [time, setTime] = useState<TimeType>(initState); // 밀리초 (정밀도 1/1000)
  const playTimeout = useRef<NodeJS.Timeout | null>(null);

  const [status, setStatus] = useState<'play' | 'stop' | 'pause'>('stop');
  const startTime = useRef<number | null>(null);
  const pauseTime = useRef<number | null>(null);
  const pausedTime = useRef<number>(0);

  const totalMillisecond = time.minute * 60 * 1000 + time.second * 1000 + time.ms;

  const timePlay = () => {
    // 최초 시작
    if (status === 'stop') startTime.current = Date.now();
    setStatus('play');
  };

  const timePause = () => {
    if (status === 'play') {
      if (playTimeout.current) clearInterval(playTimeout.current);
      pauseTime.current = Date.now();
    }
    setStatus('pause');
  };

  const timeReset = () => {
    setStatus('stop');

    if (playTimeout.current) clearInterval(playTimeout.current);
    setTime({ ...initState });

    startTime.current = null;
    pauseTime.current = null;
  };

  useEffect(() => {
    // play 눌렀을 때의 로직
    if (!startTime.current) startTime.current = Date.now();
    if (status === 'play') {
      const dateNow = Date.now();
      pausedTime.current += dateNow - (pauseTime.current ?? dateNow);
      pauseTime.current = null;
      const now = new Date(dateNow - startTime.current - pausedTime.current);
      playTimeout.current = setTimeout(() => {
        setTime({
          ...time,
          ms: now.getUTCMilliseconds(),
          second: now.getUTCSeconds(),
          minute: now.getUTCMinutes(),
          hour: now.getUTCHours(),
        });
      }, 100);
    }
    // clean-up 함수의 실행 순서는 "state 업데이트 -> 리렌더링 -> 클린업 -> 새로운 이펙트 실행" 이기 때문에 useEffect의 동작에는 문제가 없다!
    return () => {
      if (playTimeout.current) clearTimeout(playTimeout.current);
    };
  }, [playTimeout, setTime, status, time]);

  return {
    time,
    status,
    timePlay,
    timePause,
    timeReset,
    totalMillisecond,
    startTime,
  };
};

export default useStopwatch;

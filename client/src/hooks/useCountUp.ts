import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  start?: number;
}

const useCountUp = ({ start = 0, end }: CountUpProps) => {
  const [count, setCount] = useState(start);
  const currentCount = useRef(start);

  useEffect(() => {
    const counter = setInterval(() => {
      if (currentCount.current > end) {
        clearInterval(counter);
      }

      setCount(Math.ceil(currentCount.current));

      const jump = (end - currentCount.current) / 20;

      currentCount.current += jump;
    }, 50);
  }, [end]);

  return count;
};

export default useCountUp;

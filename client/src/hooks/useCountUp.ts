import { useEffect, useRef, useState } from 'react';

const useCountUp = (end: number) => {
  const [count, setCount] = useState(0);
  const currentCount = useRef(end || 0);

  useEffect(() => {
    const counter = setInterval(() => {
      setCount(Math.ceil(end - currentCount.current));

      if (currentCount.current < 1) {
        clearInterval(counter);
      }

      const jump = currentCount.current / 10;

      currentCount.current -= jump;
    }, 50);
  }, [end]);

  return count;
};

export default useCountUp;

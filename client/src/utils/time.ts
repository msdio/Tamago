const fillZeros = ({ num, length }: { num: number; length: number }) => {
  const fixedNumStr = String(parseInt(String(num.toFixed(length))));
  return fixedNumStr.padStart(length, '0');
};

export const getSecondToMMSSFormat = (seconds: number) => {
  const min = (seconds % 3600) / 60;
  const sec = seconds % 60;
  const minFormat = fillZeros({ num: min, length: 2 });
  const secFormat = fillZeros({ num: sec, length: 2 });

  return `${minFormat}:${secFormat}`;
};

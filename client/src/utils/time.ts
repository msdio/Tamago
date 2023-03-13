const toFixedDoubleDigits = (num: number) => {
  const fixedNumStr = String(parseInt(String(num.toFixed(2))));
  return fixedNumStr.padStart(2, '0');
};

export const getSecondToMMSSFormat = (seconds: number) => {
  //3항 연산자를 이용하여 10보다 작을 경우 0을 붙이도록 처리 하였다.
  const min = (seconds % 3600) / 60;
  const sec = seconds % 60;
  const minFormat = toFixedDoubleDigits(min);
  const secFormat = toFixedDoubleDigits(sec);

  return `${minFormat}:${secFormat}`;
};

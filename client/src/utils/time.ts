export const getSecondToMMSSFormat = (seconds: number) => {
  //3항 연산자를 이용하여 10보다 작을 경우 0을 붙이도록 처리 하였다.
  const min = parseInt(String((seconds % 3600) / 60));
  const minFormat = min < 10 ? '0' + min : min;
  const secFormat = seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60;

  //연산한 값을 화면에 뿌려주는 코드
  return `${minFormat}:${secFormat}`;
};

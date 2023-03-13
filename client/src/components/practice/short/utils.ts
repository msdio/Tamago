export const getWrongLength = ({ correctWriting, inputWriting }: { correctWriting: string; inputWriting: string }) => {
  let wrongCount = 0;
  for (let i = 0; i < inputWriting.length; i++) {
    if (inputWriting[i] !== correctWriting[i]) {
      wrongCount += 1;
    }
  }

  return wrongCount;
};

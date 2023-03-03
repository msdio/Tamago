import checkErrorWord, { getNumberPerChar, isHangulChar } from '@/utils/checkErrorWord';

interface CalcTypingSpeedRequest {
  elapsedTime: number;
  backspaceCount: number;
  typingCount: number;
}

const calcTypingSpeed = ({ elapsedTime, backspaceCount, typingCount }: CalcTypingSpeedRequest) => {
  // NOTE: 현재속도 = (타수-백스페이스*2) / 경과시간(초) * 60초
  return Math.floor(((typingCount - backspaceCount * 2) / elapsedTime) * 60);
};

interface CalcWrongCountRequest {
  correctWriting: string;
  inputWriting: string;
}
const calcWrongCount = ({ correctWriting, inputWriting }: CalcWrongCountRequest) => {
  let wrongCount = 0;
  for (let i = 0; i < inputWriting.length - 1; i++) {
    const errorWord = checkErrorWord(correctWriting[i], inputWriting[i]);
    wrongCount += Object.keys(errorWord).reduce(
      (accumulator, currentValue) => accumulator + errorWord[currentValue],
      0,
    );
  }
  return wrongCount;
};

export const checkAllInputTyping = (correctWord: string, inputWord: string) => {
  console.log('correctWord: ', correctWord, inputWord);
  const isCorrectWordHangul = isHangulChar(correctWord);
  const isInputWordHangul = isHangulChar(inputWord);

  if (!isCorrectWordHangul) {
    return correctWord === inputWord;
  }
  // correctWord가 한글인 경우
  if (isInputWordHangul) {
    const correctWordCount = getNumberPerChar(correctWord);
    const inputWordCount = getNumberPerChar(inputWord);

    return correctWordCount === inputWordCount;
  } else {
    return false;
  }
};

export { calcTypingSpeed, calcWrongCount };

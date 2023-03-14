import type { CharInfo } from '@/types/typing';
import checkErrorWord, { getNumberPerChar, isHangulChar } from '@/utils/checkErrorWord';
/**
 * 타수: shift => 대문자, 특수문자 (upper -> 2)
 * 대문자, 특수문자는 2로 측정
 * 공백, 줄바꿈 타수 1로 측정
 * apple => onchange
 */
export const getTypingWpm = ({ typingCount, millisecond }: { typingCount: number; millisecond: number }) => {
  if (millisecond === 0) {
    return 0;
  }
  const minute = millisecond / 60000;
  return Math.floor(typingCount / 5 / minute);
};

export const getTypingSpeed = ({
  typingCount,
  backspaceCount,
  millisecond,
}: {
  typingCount: number;
  backspaceCount: number;
  millisecond: number;
}) => {
  if (millisecond === 0) {
    return 0;
  }
  const minute = millisecond / 60000;
  return Math.floor((typingCount - backspaceCount * 2) / minute);
};

export const getTypingAccuracy = ({ typingLength, wrongLength }: { typingLength: number; wrongLength: number }) => {
  if (typingLength === 0) {
    return 0;
  }
  return Math.round(((typingLength - wrongLength) / typingLength) * 1000) / 10;
};

export const getWrongKeys = (contentInfos: CharInfo[], typingInfos: CharInfo[]) => {
  const wrongKeys: Record<string, { total: number; count: number }> = {};
  contentInfos.forEach((contentInfo, i) => {
    const { components: contentComponents } = contentInfo;
    const { components: typingComponents } = typingInfos[i];

    contentComponents.forEach((contentComponent, j) => {
      if (!wrongKeys[contentComponent]) {
        wrongKeys[contentComponent] = { total: 1, count: 0 };
      } else {
        wrongKeys[contentComponent].total++;
      }
      if (contentComponent !== typingComponents[j]) {
        wrongKeys[contentComponent].count++;
      }
    });
  });

  for (const key in wrongKeys) {
    if (wrongKeys[key].count === 0) {
      delete wrongKeys[key];
    }
  }

  return wrongKeys;
};

interface CalcTypingSpeedRequest {
  elapsedTime: number;
  backspaceCount: number;
  typingCount: number;
}

export const calcTypingSpeed = ({ elapsedTime, backspaceCount, typingCount }: CalcTypingSpeedRequest) => {
  // NOTE: 현재속도 = (타수-백스페이스*2) / 경과시간(초) * 60초
  // TODO : infinite typing speed 나는 문제 확인
  const calcCount = typingCount - backspaceCount * 2;

  if (calcCount === 0) {
    return 0;
  }
  if (elapsedTime === 0) {
    elapsedTime = 1;
  }
  return Math.floor((calcCount / elapsedTime) * 60);
};

interface calcTypingRequest {
  correctWriting: string;
  inputWriting: string;
}
export const calcWrongCount = ({ correctWriting, inputWriting }: calcTypingRequest) => {
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

// TODO : parameter Object로 변경
export const checkAllInputTyping = (correctWord: string, inputWord: string) => {
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

export const getTotalTypingCount = (inputWriting: string) => {
  let typingCount = 0;
  for (let i = 0; i < inputWriting.length - 1; i++) {
    typingCount += getNumberPerChar(inputWriting[i]);
  }
  return typingCount;
};

export const calcAccuracy = ({ correctWriting, inputWriting }: calcTypingRequest) => {
  const totalCount = inputWriting.length - 1 === 0 ? 0 : inputWriting.length - 1;
  let wrongCount = 0;
  for (let i = 0; i < totalCount; i++) {
    if (inputWriting[i] !== correctWriting[i]) {
      wrongCount += 1;
    }
  }
  if (totalCount === 0) {
    return 0;
  }
  return Math.floor(((totalCount - wrongCount) / totalCount) * 100);
};

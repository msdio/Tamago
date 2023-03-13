import { disassemble } from 'hangul-js';

import type { CharInfo } from '@/types/typing';
import { getNumberPerChar, isHangulChar } from '@/utils/checkErrorWord';

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

export const getTypingAccuracy = ({ typingLength, wrongLength }: { typingLength: number; wrongLength: number }) => {
  return (((typingLength - wrongLength) / typingLength) * 100).toFixed(1);
};

export const getTypingWpm = ({ typingCount, millisecond }: { typingCount: number; millisecond: number }) => {
  if (millisecond === 0) {
    return 0;
  }
  const minute = millisecond / 3600;
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
  const minute = millisecond / 3600;
  const calcCount = typingCount - backspaceCount * 2 >= 0 ? typingCount - backspaceCount * 2 : 0;
  return Math.floor(calcCount / minute);
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

export const getDisassembleWord = (word: string) => {
  return disassemble(word);
};

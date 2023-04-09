import { disassemble } from 'hangul-js';

import type { CharInfo, TypingHistoryType, TypingResultType } from '@/types/typing';
import { INIT_TYPING_RESULT } from '@/types/typing';

export const getTypingAccuracy = ({
  typingLength,
  wrongLength,
}: {
  typingLength: number;
  wrongLength: number;
}): number => {
  if (typingLength === 0) {
    return 0;
  }
  return Math.round(((typingLength - wrongLength) / typingLength) * 1000) / 10;
};

export const getTypingWpm = ({ typingCount, millisecond }: { typingCount: number; millisecond: number }): number => {
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
}): number => {
  if (millisecond === 0) {
    return 0;
  }
  const minute = millisecond / 60000;
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

/**
 * 원본 글, textarea 글, 글 상태를 원본 글의 각 줄에 대응되게 slice한다.
 * 이후 slice된 각 문자열을 TypingLine의 params으로 전달한다.
 */
export const slicedContentAndStrings = (content: string, ...args: string[]) => {
  const splitContent = content.split('\n').map((line) => line + '\n');
  return splitContent.map((slicedContent) =>
    args.reduce(
      (prev, curr, i) => {
        const sliced = curr.slice(0, slicedContent.length);
        args[i] = curr.slice(slicedContent.length);
        prev.push(sliced);
        return prev;
      },
      [slicedContent],
    ),
  );
};

interface GetWrongLengthProps {
  originalTyping: string;
  userTyping: string;
}

export const getWrongLength = ({ originalTyping, userTyping }: GetWrongLengthProps): number => {
  return userTyping.split('').reduce((wrongCount, currentInput, index) => {
    if (currentInput !== originalTyping[index]) {
      return wrongCount + 1;
    }

    return wrongCount;
  }, 0);
};

export const getTypingCount = ({ originalTyping, userTyping }: GetWrongLengthProps): number => {
  let typingCount = 0;
  for (let i = 0; i < userTyping.length; i++) {
    if (userTyping[i] === originalTyping[i]) {
      typingCount += disassemble(originalTyping[i]).length;
    }
  }

  return typingCount;
};

// TODO : test code 작성
export const getTypingHistoryAverage = (typingHistories: TypingHistoryType[]): TypingResultType => {
  const typingHistoriesLength = typingHistories.length;

  if (typingHistoriesLength === 0) {
    return INIT_TYPING_RESULT;
  }
  const res = {
    typingSpeed: typingHistories.reduce((acc, cur) => acc + cur.typingSpeed, 0) / typingHistoriesLength,
    typingAccuracy: typingHistories.reduce((acc, cur) => acc + cur.typingAccuracy, 0) / typingHistoriesLength,
    typingWpm: typingHistories.reduce((acc, cur) => acc + cur.typingWpm, 0) / typingHistoriesLength,
    typingTime: typingHistories.reduce((acc, cur) => acc + cur.typingTime, 0) / typingHistoriesLength,
  };

  return res;
};

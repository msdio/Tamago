import type { CharInfo } from '@/types/typing';

export const getTypingAccuracy = ({ typingLength, wrongLength }: { typingLength: number; wrongLength: number }) => {
  if (typingLength === 0) {
    return 0;
  }
  return Math.round(((typingLength - wrongLength) / typingLength) * 1000) / 10;
};

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

export const getWrongLength = ({ originalTyping, userTyping }: { originalTyping: string; userTyping: string }) => {
  let wrongCount = 0;
  for (let i = 0; i < userTyping.length; i++) {
    if (userTyping[i] !== originalTyping[i]) {
      wrongCount += 1;
    }
  }

  return wrongCount;
};

interface GetWrongLengthProps {
  originalTyping: string;
  userTyping: string;
}

export const getTypingCount = ({ originalTyping, userTyping }: { originalTyping: string; userTyping: string }) => {
  return userTyping.split('').reduce((wrongCount, currentInput, index) => {
    if (currentInput !== originalTyping[index]) {
      return wrongCount + 1;
    }

    return wrongCount;
  }, 0);
};

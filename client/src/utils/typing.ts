import type { CharInfo } from '@/types/typing';
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

/**
 * 원본 글, textarea 글, 글 상태를 원본 글의 각 줄에 대응되게 slice한다.
 * 이후 slice된 각 문자열을 TypingLine의 params으로 전달한다.
 */
export const slicedContentAndStrings = (content: string, ...args: string[]) => {
  const spiltedContent = content.split('\n').map((line) => line + '\n');
  return spiltedContent.map((slicedContent) =>
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

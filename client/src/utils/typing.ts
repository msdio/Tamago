import type { CharInfo } from '@/types/typing';

export const getTypingAccuracy = (states: string) => {
  // 어떤 문자도 타이핑하지 않은 상태
  if (states === 'f') {
    return 0;
  }

  const totalCharCount = states.length - 1;
  const incorrectCharCount = states.replaceAll('c', '').length - 1; // 전체 타이핑 상태에서 맞은 것과 포커싱된 것 제외
  const correctCharCount = totalCharCount - incorrectCharCount; // 전체 타이핑에서 틀린 것과 포커싱된 것 제외

  return Math.round((correctCharCount / totalCharCount) * 100);
};

/**
 * @param typingCount 타수
 * @param minute 사용자가 타이핑한 시간(분 단위)
 * @returns wpm
 */
export const getTypingWpm = ({ typingCount, minute }: { typingCount: number; minute: number }) => {
  if (minute === 0) {
    return 0;
  }
  return Math.floor(typingCount / 5 / minute);
};

/**
 * @param typingCount 타수
 * @param minute 사용자가 타이핑한 시간(분 단위)
 * @returns 타자속도
 */
export const getTypingSpeed = ({ typingCount, minute }: { typingCount: number; minute: number }) => {
  if (minute === 0) {
    return 0;
  }
  return Math.floor(typingCount / minute);
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

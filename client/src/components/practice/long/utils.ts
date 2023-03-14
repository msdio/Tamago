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

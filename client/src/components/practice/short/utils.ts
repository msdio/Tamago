import { disassemble } from 'hangul-js';

export const getWrongLength = ({
  originalWriting,
  inputWriting,
}: {
  originalWriting: string;
  inputWriting: string;
}) => {
  let wrongCount = 0;
  for (let i = 0; i < inputWriting.length; i++) {
    if (inputWriting[i] !== originalWriting[i]) {
      wrongCount += 1;
    }
  }

  return wrongCount;
};

export const checkAllInputTyping = ({ originalWord, typingWord }: { originalWord: string; typingWord: string }) => {
  return disassemble(originalWord).length === disassemble(typingWord).length;
};

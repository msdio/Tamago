import { disassemble } from 'hangul-js';

interface GetWrongLengthProps {
  originalTyping: string;
  userTyping: string;
}

export const getWrongLength = ({ originalTyping, userTyping }: GetWrongLengthProps) => {
  return userTyping.split('').reduce((wrongCount, currentInput, index) => {
    if (currentInput !== originalTyping[index]) {
      return wrongCount + 1;
    }

    return wrongCount;
  }, 0);
};

export const checkAllInputTyping = ({ originalWord, typingWord }: { originalWord: string; typingWord: string }) => {
  return disassemble(originalWord).length === disassemble(typingWord).length;
};

import { disassemble } from 'hangul-js';

export const getWrongLength = ({ originalTyping, userTyping }: { originalTyping: string; userTyping: string }) => {
  let wrongCount = 0;
  for (let i = 0; i < userTyping.length; i++) {
    if (userTyping[i] !== originalTyping[i]) {
      wrongCount += 1;
    }
  }

  return wrongCount;
};

export const checkAllInputTyping = ({ originalWord, typingWord }: { originalWord: string; typingWord: string }) => {
  return disassemble(originalWord).length === disassemble(typingWord).length;
};

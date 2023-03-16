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

// typingCount : 정답인 글쇠의 개수
// 안녕하 --> 8
// 하 vs 아 -> x
export const getTypingCount = ({ originalTyping, userTyping }: { originalTyping: string; userTyping: string }) => {
  let typingCount = 0;
  for (let i = 0; i < userTyping.length; i++) {
    if (userTyping[i] === originalTyping[i]) {
      typingCount += disassemble(originalTyping[i]).length;
    }
  }

  return typingCount;
};

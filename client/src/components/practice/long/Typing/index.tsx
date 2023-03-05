import { Flex, Textarea } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import TypingLine from '../common/TypingLine';
import PracticeLongLayout from '../Layout';

interface CharInfo {
  char: string;
  type: string;
  components: string[];
}

interface PracticeLongTypingProps {
  title: string;
  content: string;
  currPage: number;
  totalPage: number;
}

const getCharType = (char: string) => {
  if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char)) return 'hangul';
  if (/[a-zA-Z]/.test(char)) return 'english';
  return 'other';
};

export default function PracticeLongTyping({ title, content, currPage, totalPage }: PracticeLongTypingProps) {
  const originalInfo = useRef<CharInfo[]>(
    [...content].map((char) => ({
      char,
      type: getCharType(char),
      components: [],
    })),
  );
  const typingInfo = useRef<CharInfo[]>(
    [...content].map(() => ({
      char: '',
      type: 'other',
      components: [],
    })),
  );
  const [textarea, setTextarea] = useState('');
  const [typingStates, setTypingStates] = useState<string>('f');
  const [recentChar, setRecentChar] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    console.log(value);
    setTextarea(value);

    const currLength = typingStates.length - 1;

    // 한글처럼 여러 글쇠로 이루어진 문자의 경우 타이핑을 해도 길이가 동일한 경우 발생, 빼는 경우도 마찬가지
    if (value.length === currLength) {
      typingInfo.current[value.length - 1].char = value[value.length - 1];
      const lastComponent = typingInfo.current[value.length - 1].components.at(-1);
      // 한글을 뺀 경우 (길이 변화 X)
      if (lastComponent === recentChar) {
        typingInfo.current[value.length - 1].components.pop();
        setRecentChar(typingInfo.current[value.length - 1].components.at(-1)!);

        if (originalInfo.current[value.length - 1].char === value[value.length - 1]) {
          setTypingStates(`${typingStates.slice(0, -2)}cf`);
          return;
        }

        if (
          originalInfo.current[value.length - 1].components.length >
          typingInfo.current[value.length - 1].components.length
        ) {
          setTypingStates(`${typingStates.slice(0, -2)}uf`);
        } else {
          setTypingStates(`${typingStates.slice(0, -2)}if`);
        }
      }
      // 한글을 더한 경우 (길이 변화 X)
      else {
        typingInfo.current[value.length - 1].components.push(recentChar);

        if (originalInfo.current[value.length - 1].char === value[value.length - 1]) {
          setTypingStates(`${typingStates.slice(0, -2)}cf`);
          return;
        }

        if (
          originalInfo.current[value.length - 1].components.length >
          typingInfo.current[value.length - 1].components.length
        ) {
          setTypingStates(`${typingStates.slice(0, -2)}uf`);
        } else {
          setTypingStates(`${typingStates.slice(0, -2)}if`);
        }
      }
      return;
    }

    // 타이핑하는 경우
    if (value.length > currLength) {
      // typingStates = typingStates.replace('u', 'i');

      typingInfo.current[value.length - 1].char = value[value.length - 1];
      typingInfo.current[value.length - 1].type = getCharType(value[value.length - 1]);
      typingInfo.current[value.length - 1].components = [recentChar];

      if (originalInfo.current[value.length - 1].char === value[value.length - 1]) {
        setTypingStates(`${typingStates.replace('u', 'i').slice(0, -1)}cf`);
        return;
      }

      if (originalInfo.current[value.length - 1].type !== typingInfo.current[value.length - 1].type) {
        setTypingStates(`${typingStates.replace('u', 'i').slice(0, -1)}if`);
        return;
      }

      if (
        originalInfo.current[value.length - 1].components.length >
        typingInfo.current[value.length - 1].components.length
      ) {
        setTypingStates(`${typingStates.replace('u', 'i').slice(0, -1)}uf`);
        return;
      }

      if (originalInfo.current[value.length - 1].char !== value[value.length - 1]) {
        setTypingStates(`${typingStates.replace('u', 'i').slice(0, -1)}if`);
        return;
      }

      return;
    }

    // 빼는 경우
    if (value.length < currLength) {
      typingInfo.current[value.length - 1].char = '';
      typingInfo.current[value.length - 1].type = 'other';
      typingInfo.current[value.length - 1].components = [];

      // if (
      //   original[lastIndex].components.length >
      //   typing[lastIndex].components.length
      // ) {
      //   setTypingStates(`${typingStates.slice(0, -3)}if`); // 미완성 문자 처리
      //   return;
      // }

      setTypingStates(`${typingStates.slice(0, -2)}f`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key.length > 1) return;
    setRecentChar(e.key);
  };

  const slicedContentAndTextareaAndStates = (content: string, textarea: string, states: string) => {
    const spiltedContent = content.split('\n').map((line) => line + '\n');
    return spiltedContent.map((slicedContent) => {
      const slicedTextarea = textarea.slice(0, slicedContent.length);
      const slicedtypingStates = states.slice(0, slicedContent.length);
      textarea = textarea.slice(slicedContent.length);
      states = states.slice(slicedContent.length);
      return [slicedContent, slicedTextarea, slicedtypingStates] as const;
    });
  };

  useEffect(() => {
    focusTextarea();
  }, []);

  return (
    <PracticeLongLayout>
      <Flex
        direction='column'
        h='390px'
        border='0.6px solid #000000'
        borderRadius='10px'
        backgroundColor='#fff'
        p='34px 53px'
        onClick={focusTextarea}
      >
        <Textarea
          pos='absolute'
          left='-9999px'
          value={textarea}
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        {slicedContentAndTextareaAndStates(content, textarea, typingStates).map(
          ([contentLine, typingLine, states], i) => (
            <TypingLine key={i} contentLine={contentLine} typingLine={typingLine} states={states} />
          ),
        )}
      </Flex>
    </PracticeLongLayout>
  );
}

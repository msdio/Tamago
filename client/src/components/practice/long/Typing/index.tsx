import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import DownArrow from '@/icons/DownArrow';
import { getTypingAccuracy } from '@/utils/typing';

import useStopwatch from '../../short/useStopWatch';
import TypingLine from '../common/TypingLine';
import PracticeLongLayout from '../Layout';
import InfoBar from './InfoBar';

const INIT_INFO = {
  wpm: 0,
  accuracy: 0,
  typist: 0,
};

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
  // 원본 긴 글을 분석하여 저장
  const originalInfo = useRef<CharInfo[]>(
    [...content].map((char) => ({
      char,
      type: getCharType(char),
      components: [],
    })),
  );
  // 사용자가 타이핑한 문자들을 분석하여 저장, 초기에는 빈 문자로 초기화
  const typingInfo = useRef<CharInfo[]>(
    [...content].map(() => ({
      char: '',
      type: 'other',
      components: [],
    })),
  );
  const [textarea, setTextarea] = useState('');
  // 처음 'f'로 초기화되어 가장 먼저 온 글자에 포커싱, 'f' 이외에도 'c'(correct), 'i'(incorrect), 'u'(unknown)로 상태 구분
  const [typingStates, setTypingStates] = useState<string>('f');
  // 사용자가 마지막으로 타이핑한 글쇠 저장, 한글을 타이핑한 경우 의미를 갖는다.
  const [recentChar, setRecentChar] = useState<string>('');
  const [infos, setInfos] = useState(INIT_INFO);

  const { time, status, timePlay, timePause } = useStopwatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * 숨겨진 textarea로 포커싱
   */
  const focusTextarea = () => textareaRef.current?.focus();

  /**
   * 처음 화면이 렌더링될 때 textarea로 포커싱되도록 한다.
   * textarea는 숨겨두었기 때문에 사용자가 보고 포커싱할 수 없다.
   */
  useEffect(() => {
    focusTextarea();
  }, []);

  useEffect(() => {
    if (status === 'stop') return;
  }, [time]);

  /**
   * 타이핑할 때마다 타자 정확도 계산
   */
  useEffect(() => {
    infos.accuracy = getTypingAccuracy(typingStates);
    setInfos({ ...infos });
  }, [typingStates]);

  /**
   * 사용자가 타이핑을 할 경우 상태 변화
   * textarea의 value를 기본적으로 바꾸고
   * 원본 긴 글과 사용자가 타이핑한 글의 정보를 업데이트한다.
   * 한글의 경우 더하거나 지우더라도 value의 길이가 변하지 않는 경우 존재하여
   * 해당 경우에 대한 경우의 수 처리
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 타이핑 시작시 타이머 동작
    if (status === 'stop') {
      timePlay();
    }

    const { value } = e.target;

    // 타이핑 완료시 api 호출
    if (value.length > originalInfo.current.length) {
      console.log('finish');
      return;
    }

    setTextarea(value);
    const currLength = typingStates.length - 1;

    // 한글처럼 여러 글쇠로 이루어진 문자의 경우 타이핑을 해도 길이가 동일한 경우 발생, 빼는 경우도 마찬가지
    if (value.length === currLength) {
      typingInfo.current[value.length - 1].char = value[value.length - 1];
      const lastComponent = typingInfo.current[value.length - 1].components.at(-1);
      // 한글을 뺀 경우 (길이 변화 X)
      if (lastComponent === recentChar) {
        typingInfo.current[value.length - 1].components.pop();
        setRecentChar(typingInfo.current[value.length - 1].components.at(-1) || '');

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

    // 타이핑하여 글자가 증가한 경우
    if (value.length > currLength) {
      typingInfo.current[value.length - 1].char = value[value.length - 1];
      typingInfo.current[value.length - 1].type = getCharType(value[value.length - 1]);
      typingInfo.current[value.length - 1].components = [recentChar];

      if (originalInfo.current[value.length - 1].char === typingInfo.current[value.length - 1].char) {
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
    }

    // 빼서 글자가 감소한 경우
    if (value.length < currLength) {
      typingInfo.current[value.length].char = '';
      typingInfo.current[value.length].type = 'other';
      typingInfo.current[value.length].components = [];

      setTypingStates(`${typingStates.slice(0, -2)}f`);
    }
  };

  /**
   * 누른 key가 특수키(Space, Enter 등)인 경우 제외하고
   * 사용자가 마지막에 타이핑한 글쇠에 key 저장
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key.length > 1) return;
    setRecentChar(e.key);
  };

  /**
   * 원본 글, textarea 글, 글 상태를 원본 글의 각 줄에 대응되게 slice한다.
   * 이후 slice된 각 문자열을 TypingLine의 params으로 전달한다.
   */
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

  return (
    <PracticeLongLayout>
      <Flex gap='24px' mb='28px'>
        <Box w='118px' bg='#CEF0FF' border=' 0.6px solid #000000' borderRadius={10}></Box>
        <Box flex={1}>
          <Flex
            mb='21px'
            alignItems='center'
            gap='8.5px'
            border='0.6px solid #000000'
            bg='#BCF075'
            w='fit-content'
            p='10px 23px'
            borderRadius={30}
          >
            <Text fontSize='18px' fontWeight={500}>
              긴 글 연습모드
            </Text>
            <DownArrow />
          </Flex>
          <InfoBar {...infos} time={time.minute * 60 + time.second} />
        </Box>
      </Flex>
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

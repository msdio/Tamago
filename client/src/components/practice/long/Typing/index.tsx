import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { disassemble } from 'hangul-js';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import DownArrow from '@/icons/DownArrow';
import type { CharInfo, LongTypingDetail } from '@/types/typing';
import { getCharType } from '@/utils/char';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, getWrongKeys, slicedContentAndStrings } from '@/utils/typing';

import useStopwatch from '../../short/useStopWatch';
import TypingLine from '../common/TypingLine';
import PracticeLongLayout from '../Layout';
import InfoBar from './InfoBar';

export default function PracticeLongTyping({
  content,
  currentPage,
  language,
  title,
  totalPage,
  typingId,
}: LongTypingDetail) {
  const router = useRouter();

  // 원본 긴 글을 분석하여 저장
  const contentInfos = useRef<CharInfo[]>(
    [...content].map((char) => ({
      char,
      type: getCharType(char),
      components: disassemble(char),
    })),
  );
  // 사용자가 타이핑한 문자들을 분석하여 저장, 초기에는 빈 문자로 초기화
  const typingInfos = useRef<CharInfo[]>(
    [...content].map(() => ({
      char: '',
      type: 'other',
      components: [],
    })),
  );
  const [textarea, setTextarea] = useState('');
  // 처음 'f'로 초기화되어 가장 먼저 온 글자에 포커싱, 'f' 이외에도 'c'(correct), 'i'(incorrect), 'u'(unknown)로 상태 구분
  const [typingStates, setTypingStates] = useState('f');
  const [typingWpm, setTypingWpm] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  // 맞춘 타수
  const [typingCount, setTypingCount] = useState(0);
  // 백스페이스 타수
  const [backspaceCount, setBackspaceCount] = useState(0);

  const { time, status, timePlay, timePause } = useStopwatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * 숨겨진 textarea로 포커싱
   */
  const focusTextarea = () => textareaRef.current?.focus();

  const typingAccuracyHandler = useCallback(() => {
    setTypingAccuracy(getTypingAccuracy(typingStates));
  }, [typingStates]);

  const typingSpeedHandler = useCallback(() => {
    setTypingWpm(getTypingWpm({ typingCount: typingCount, minute: time.minute + time.second / 60 + time.ms / 60000 }));
    setTypingSpeed(
      getTypingSpeed({
        typingCount: typingCount,
        backspaceCount: backspaceCount,
        minute: time.minute + time.second / 60 + time.ms / 60000,
      }),
    );
  }, [typingCount, backspaceCount, time]);

  /**
   * 처음 화면이 렌더링될 때 textarea로 포커싱되도록 한다.
   * textarea는 숨겨두었기 때문에 사용자가 보고 포커싱할 수 없다.
   */
  useEffect(() => {
    focusTextarea();
  }, []);

  useEffect(() => {
    if (status === 'stop') {
      return;
    }
    typingAccuracyHandler();
  }, [status, typingAccuracyHandler]);

  useEffect(() => {
    if (status === 'stop') {
      return;
    }
    typingSpeedHandler();
  }, [status, typingSpeedHandler]);

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
    if (value.length > contentInfos.current.length) {
      timePause();
      const endTime = Date.now();
      const typingTime = time.minute * 60 * 1000 + time.second * 1000 + time.ms;
      const result = {
        typingId: router.query.typingId,
        typingPage: router.query.pageNum,
        resultContent: textarea,
        startTime: new Date(endTime - typingTime),
        endTime: new Date(endTime),
        typingSpeed,
        mode: 'PRACTICE',
        wpm: typingWpm,
        typingAccuracy,
        wrongKeys: getWrongKeys(contentInfos.current, typingInfos.current),
      };
      alert(JSON.stringify(result));
      return;
    }

    setTextarea(value);
    const currLength = typingStates.length - 1;

    // 한글처럼 여러 글쇠로 이루어진 문자의 경우 타이핑을 해도 길이가 동일한 경우 발생, 빼는 경우도 마찬가지
    if (value.length === currLength) {
      typingInfos.current[value.length - 1].char = value[value.length - 1];
      typingInfos.current[value.length - 1].type = getCharType(value[value.length - 1]);
      const prevComponents = typingInfos.current[value.length - 1].components;
      const currComponents = disassemble(value[value.length - 1]);
      typingInfos.current[value.length - 1].components = disassemble(value[value.length - 1]);
      // 한글을 뺀 경우 (길이 변화 X)
      if (prevComponents > currComponents) {
        if (contentInfos.current[value.length - 1].char === value[value.length - 1]) {
          setTypingStates(`${typingStates.slice(0, -2)}cf`);
          const count = typingInfos.current[value.length - 1].components.length;
          setTypingCount(typingCount + count);
        } else {
          setTypingStates(`${typingStates.slice(0, -2)}if`);
        }
      }
      // 한글을 더한 경우 (길이 변화 X)
      else {
        if (contentInfos.current[value.length - 1].char === value[value.length - 1]) {
          setTypingStates(`${typingStates.slice(0, -2)}cf`);
          const count = typingInfos.current[value.length - 1].components.length;
          setTypingCount(typingCount + count);
        } else {
          setTypingStates(`${typingStates.slice(0, -2)}if`);
        }
      }
    }
    // 타이핑하여 글자가 증가한 경우
    else if (value.length > currLength) {
      typingInfos.current[value.length - 1].char = value[value.length - 1];
      typingInfos.current[value.length - 1].type = getCharType(value[value.length - 1]);
      typingInfos.current[value.length - 1].components = disassemble(value[value.length - 1]);

      if (contentInfos.current[value.length - 1].char === typingInfos.current[value.length - 1].char) {
        setTypingStates(`${typingStates.slice(0, -1)}cf`);
        const count = typingInfos.current[value.length - 1].components.length;
        setTypingCount(typingCount + count);
      } else {
        setTypingStates(`${typingStates.slice(0, -1)}if`);
      }
    }
    // 빼서 글자가 감소한 경우
    else if (value.length < currLength) {
      typingInfos.current[value.length].char = '';
      typingInfos.current[value.length].type = 'other';
      typingInfos.current[value.length].components = [];

      setBackspaceCount(backspaceCount + 1);
      setTypingStates(`${typingStates.slice(0, -2)}f`);
    }
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
          <InfoBar
            accuracy={typingAccuracy}
            speed={typingSpeed}
            wpm={typingWpm}
            time={time.minute * 60 + time.second}
          />
        </Box>
      </Flex>
      <Flex
        h='550px'
        direction='column'
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
          onChange={handleChange}
          onSelect={(e) =>
            e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
          }
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
        />
        {slicedContentAndStrings(content, textarea, typingStates).map(([contentLine, typingLine, states], i) => (
          <TypingLine key={i} contentLine={contentLine} typingLine={typingLine} states={states} />
        ))}
      </Flex>
    </PracticeLongLayout>
  );
}

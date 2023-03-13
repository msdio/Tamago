import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { disassemble } from 'hangul-js';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import DownArrow from '@/icons/DownArrow';
import type { CharInfo, LongTypingDetail } from '@/types/typing';
import { getCharType } from '@/utils/char';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, slicedContentAndStrings } from '@/utils/typing';

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

  const [contentInfos, setContentInfos] = useState<CharInfo[]>([]);
  const [typingInfos, setTypingInfos] = useState<CharInfo[]>([]);
  const [textarea, setTextarea] = useState('');
  /* 처음 'f'로 초기화되어 가장 먼저 온 글자에 포커싱, 'f' 이외에도 'c'(correct), 'i'(incorrect), 'u'(unknown)로 상태 구분 */
  const [typingStates, setTypingStates] = useState('');
  const [typingWpm, setTypingWpm] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  const [typingCount, setTypingCount] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);

  const { time, status, timePlay, timePause, timeReset } = useStopwatch();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * 숨겨진 textarea로 포커싱
   */
  const focusTextarea = () => textareaRef.current?.focus();

  const typingAccuracyHandler = useCallback(() => {
    setTypingAccuracy(
      getTypingAccuracy({
        typingLength: typingStates.length - 1,
        wrongLength: typingStates.replaceAll('c', '').length - 1,
      }),
    );
  }, [typingStates]);

  const typingSpeedHandler = useCallback(() => {
    setTypingWpm(
      getTypingWpm({
        typingCount: typingCount,
        millisecond: time.minute * 60000 + time.second * 1000 + time.ms,
      }),
    );
    setTypingSpeed(
      getTypingSpeed({
        typingCount: typingCount,
        backspaceCount: backspaceCount,
        millisecond: time.minute * 60000 + time.second * 1000 + time.ms,
      }),
    );
  }, [typingCount, backspaceCount, time]);

  /**
   * 처음 화면이 렌더링될 때 textarea로 포커싱되도록 한다.
   * textarea는 숨겨두었기 때문에 사용자가 보고 포커싱할 수 없다.
   * router.push를 사용해 동적 라우팅 간 이동을 할 경우 새로고침이 일어나지 않기 때문에
   * 기존의 상태들이 모두 그대로 남아있게 되어 리렌더링이 될경우 상태를 모두 초기화해줘야 한다.
   */
  useEffect(() => {
    setContentInfos(
      [...content].map((char) => ({
        char,
        type: getCharType(char),
        components: disassemble(char),
      })),
    );
    setTypingInfos(
      [...content].map(() => ({
        char: '',
        type: 'other',
        components: [],
      })),
    );
    setTextarea('');
    setTypingStates('f');
    setTypingCount(0);
    setBackspaceCount(0);
    setTypingAccuracy(0);
    setTypingSpeed(0);
    setTypingWpm(0);
    timeReset();
    focusTextarea();
  }, [router.asPath]);

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
    if (value.length > contentInfos.length) {
      timePause();
      // const endTime = Date.now();
      // const typingTime = time.minute * 60000 + time.second * 1000 + time.ms;
      // const result = {
      //   typingId: router.query.typingId,
      //   typingPage: router.query.pageNum,
      //   resultContent: textarea,
      //   startTime: new Date(endTime - typingTime),
      //   endTime: new Date(endTime),
      //   typingSpeed,
      //   mode: 'PRACTICE',
      //   wpm: typingWpm,
      //   typingAccuracy,
      //   wrongKeys: getWrongKeys(contentInfos, typingInfos),
      // };
      if (confirm(`정확도: ${typingAccuracy}, wpm: ${typingWpm}, 타속: ${typingSpeed}`)) {
        if (totalPage > currentPage) {
          router.push(`/practice/long/${typingId}/${currentPage + 1}?mode=practice`);
        } else {
          router.push(`/practice/long`);
        }
      }
      return;
    }

    setTextarea(value);
    const currLength = typingStates.length - 1;

    // 한글처럼 여러 글쇠로 이루어진 문자의 경우 타이핑을 해도 길이가 동일한 경우 발생, 빼는 경우도 마찬가지
    if (value.length === currLength) {
      typingInfos[value.length - 1].char = value[value.length - 1];
      typingInfos[value.length - 1].type = getCharType(value[value.length - 1]);
      const prevComponents = typingInfos[value.length - 1].components;
      const currComponents = disassemble(value[value.length - 1]);
      typingInfos[value.length - 1].components = disassemble(value[value.length - 1]);
      // 한글을 뺀 경우 (길이 변화 X)
      if (prevComponents > currComponents) {
        if (contentInfos[value.length - 1].char === value[value.length - 1]) {
          setTypingStates(`${typingStates.slice(0, -2)}cf`);
          const count = typingInfos[value.length - 1].components.length;
          setTypingCount(typingCount + count);
        } else {
          setTypingStates(`${typingStates.slice(0, -2)}if`);
        }
      }
      // 한글을 더한 경우 (길이 변화 X)
      else {
        if (contentInfos[value.length - 1].char === value[value.length - 1]) {
          setTypingStates(`${typingStates.slice(0, -2)}cf`);
          const count = typingInfos[value.length - 1].components.length;
          setTypingCount(typingCount + count);
        } else {
          setTypingStates(`${typingStates.slice(0, -2)}if`);
        }
      }
    }
    // 타이핑하여 글자가 증가한 경우
    else if (value.length > currLength) {
      typingInfos[value.length - 1].char = value[value.length - 1];
      typingInfos[value.length - 1].type = getCharType(value[value.length - 1]);
      typingInfos[value.length - 1].components = disassemble(value[value.length - 1]);

      if (contentInfos[value.length - 1].char === typingInfos[value.length - 1].char) {
        setTypingStates(`${typingStates.slice(0, -1)}cf`);
        const count = typingInfos[value.length - 1].components.length;
        setTypingCount(typingCount + count);
      } else {
        setTypingStates(`${typingStates.slice(0, -1)}if`);
      }
    }
    // 빼서 글자가 감소한 경우
    else if (value.length < currLength) {
      typingInfos[value.length].char = '';
      typingInfos[value.length].type = 'other';
      typingInfos[value.length].components = [];

      setBackspaceCount(backspaceCount + 1); /* TODO : 타이핑을 엄청 틀린 후 지울 경우 예외처리 */
      setTypingStates(`${typingStates.slice(0, -2)}f`);
    }

    setTypingInfos(typingInfos);
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

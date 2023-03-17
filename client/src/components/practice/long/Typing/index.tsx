import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { disassemble } from 'hangul-js';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import DownArrow from '@/icons/DownArrow';
import type { CharInfo, LongTypingDetail } from '@/types/typing';
import { TypingState } from '@/types/typing';
import { getCharType } from '@/utils/char';
import { PRACTICE_LONG_PATH_DETAIL } from '@/utils/paths';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, slicedContentAndStrings } from '@/utils/typing';

import useStopwatch from '../../short/useStopWatch';
import PracticeLongLayout from '../Layout';
import TypingLine from '../TypingLine';
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

  const [textarea, setTextarea] = useState('');
  const { time, status, timePlay, timePause, timeReset } = useStopwatch();

  const contentInfos = useRef<CharInfo[]>(
    [...content].map((char) => ({
      char,
      type: getCharType(char),
      components: disassemble(char),
    })),
  );
  const typingInfos = useRef<CharInfo[]>(
    [...content].map(() => ({
      char: '',
      type: 'other',
      components: [],
    })),
  );
  const typingStates = useRef<string>(TypingState.FOCUS);
  const typingWpm = useRef(0);
  const typingSpeed = useRef(0);
  const typingAccuracy = useRef(0);
  const typingCount = useRef(0);
  const backspaceCount = useRef(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * 숨겨진 textarea로 포커싱
   */
  const focusTextarea = () => textareaRef.current?.focus();

  /**
   * 처음 화면이 렌더링될 때 textarea로 포커싱되도록 한다.
   * textarea는 숨겨두었기 때문에 사용자가 보고 포커싱할 수 없다.
   * router.push를 사용해 동적 라우팅 간 이동을 할 경우 새로고침이 일어나지 않기 때문에
   * 기존의 상태들이 모두 그대로 남아있게 되어 리렌더링이 될경우 상태를 모두 초기화해줘야 한다.
   */
  useEffect(() => {
    focusTextarea();
  }, []);

  useEffect(() => {
    typingAccuracy.current = getTypingAccuracy({
      typingLength: typingStates.current.length - 1,
      wrongLength: typingStates.current.replaceAll(TypingState.CORRECT, '').length - 1,
    });
  }, [textarea]);

  useEffect(() => {
    typingSpeed.current = getTypingSpeed({
      typingCount: typingCount.current,
      backspaceCount: backspaceCount.current,
      millisecond: time.minute * 60000 + time.second * 1000 + time.ms,
    });
    typingWpm.current = getTypingWpm({
      typingCount: typingCount.current,
      millisecond: time.minute * 60000 + time.second * 1000 + time.ms,
    });
  }, [status, textarea, time]);

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

    const textareaLength = value.length;
    const typingLength = typingStates.current.length - 1;
    const contentLength = contentInfos.current.length;

    // 타이핑 완료시 api 호출
    if (textareaLength > contentLength) {
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
      if (confirm(`정확도: ${typingAccuracy.current}, wpm: ${typingWpm.current}, 타속: ${typingSpeed.current}`)) {
        if (totalPage > currentPage) {
          router.replace(
            `${PRACTICE_LONG_PATH_DETAIL}?typingId=${typingId}&pageNum=${currentPage + 1}&isTyping=true`,
            undefined,
            { shallow: false },
          );
        } else {
          router.push(`/practice/long`);
        }
      }
      return;
    }

    setTextarea(value);

    // 한글처럼 여러 글쇠로 이루어진 문자의 경우 타이핑을 해도 길이가 동일한 경우 발생, 빼는 경우도 마찬가지
    if (textareaLength === typingLength) {
      const prevComponents = typingInfos.current[textareaLength - 1].components;

      typingInfos.current[textareaLength - 1] = {
        char: textarea[textareaLength - 1],
        type: getCharType(textarea[textareaLength - 1]),
        components: disassemble(textarea[textareaLength - 1]),
      };

      const currComponents = typingInfos.current[textareaLength - 1].components;

      // 한글을 뺀 경우 (길이 변화 X)
      if (prevComponents > currComponents) {
        if (contentInfos.current[textareaLength - 1].char === value[textareaLength - 1]) {
          typingStates.current = typingStates.current.slice(0, -2) + TypingState.CORRECT + TypingState.FOCUS;
          typingCount.current +=
            typingInfos.current[textareaLength - 1].components.length; /* 현재 글자의 글쇠를 타수에 더함 */
        } else {
          typingStates.current = typingStates.current.slice(0, -2) + TypingState.INCORRECT + TypingState.FOCUS;
        }
      }
      // 한글을 더한 경우 (길이 변화 X)
      else {
        if (contentInfos.current[textareaLength - 1].char === value[textareaLength - 1]) {
          typingStates.current = typingStates.current.slice(0, -2) + TypingState.CORRECT + TypingState.FOCUS;
          typingCount.current += typingInfos.current[textareaLength - 1].components.length;
        } else {
          typingStates.current = typingStates.current.slice(0, -2) + TypingState.INCORRECT + TypingState.FOCUS;
        }
      }
    }
    // 타이핑하여 글자가 증가한 경우
    else if (textareaLength > typingLength) {
      typingInfos.current[textareaLength - 1] = {
        char: value[textareaLength - 1],
        type: getCharType(value[textareaLength - 1]),
        components: disassemble(value[textareaLength - 1]),
      };

      if (contentInfos.current[textareaLength - 1].char === typingInfos.current[textareaLength - 1].char) {
        typingStates.current = typingStates.current.slice(0, -1) + TypingState.CORRECT + TypingState.FOCUS;
        typingCount.current += typingInfos.current[textareaLength - 1].components.length;
      } else {
        typingStates.current = typingStates.current.slice(0, -1) + TypingState.INCORRECT + TypingState.FOCUS;
      }
    }
    // 빼서 글자가 감소한 경우
    else if (textareaLength < typingLength) {
      typingInfos.current[textareaLength] = {
        char: '',
        type: 'other',
        components: [],
      };

      backspaceCount.current += 1; /* TODO : 타이핑을 엄청 틀린 후 지울 경우 예외처리 */
      typingStates.current = typingStates.current.slice(0, -2) + TypingState.FOCUS;
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
            accuracy={typingAccuracy.current}
            speed={typingSpeed.current}
            wpm={typingWpm.current}
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
        {slicedContentAndStrings(content, textarea, typingStates.current).map(
          ([contentLine, typingLine, states], i) => (
            <TypingLine key={i} contentLine={contentLine} typingLine={typingLine} states={states} />
          ),
        )}
      </Flex>
    </PracticeLongLayout>
  );
}

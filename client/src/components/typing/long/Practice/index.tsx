import { Flex, Textarea } from '@chakra-ui/react';
import { disassemble } from 'hangul-js';
import { useRouter } from 'next/router';
import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getTypingHistoryAPI } from '@/apis/typing';
import { userProfileState } from '@/atoms/userProfile';
import PracticeResultModal from '@/components/common/ResultModal/practice-mode';
import LongLayout from '@/components/typing/long/Layout';
import TypingDetailPagination from '@/components/typing/long/TypingDetailPagination';
import TypingHeader from '@/components/typing/long/TypingHeader';
import TypingLine from '@/components/typing/long/TypingLine';
import { PRACTICE_LONG_PATH_DETAIL, PRACTICE_LONG_PATH_LIST } from '@/constants/paths';
import { TYPING_STATE } from '@/constants/typing';
import useStopwatch from '@/hooks/useStopWatch';
import useToggle from '@/hooks/useToggle';
import type { CharInfo, LongTypingDetail } from '@/types/typing';
import { getCharType } from '@/utils/char';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, getWrongKeys, slicedContentAndStrings } from '@/utils/typing';

const getNextPageURL = (typingId: number, currentPage: number, totalPage: number) => {
  if (currentPage === totalPage) {
    return PRACTICE_LONG_PATH_LIST;
  }
  return `${PRACTICE_LONG_PATH_DETAIL}?typingId=${typingId}&pageNum=${currentPage + 1}&isTyping=true`;
};

export default function PracticeLongTyping({
  content,
  currentPage,
  language,
  title,
  totalPage,
  typingId,
}: LongTypingDetail) {
  const router = useRouter();

  const userProfile = useRecoilValue(userProfileState);

  const [isResultModalOpen, handleResultModalToggle] = useToggle();

  const [textarea, setTextarea] = useState('');
  const { totalMillisecond, status, timePlay, timePause } = useStopwatch();

  const originalInfos = useRef<CharInfo[]>(
    [...content].map((char) => ({
      char,
      type: getCharType(char),
      components: disassemble(char),
    })),
  );
  const userInfos = useRef<CharInfo[]>(
    [...content].map(() => ({
      char: '',
      type: 'other',
      components: [],
    })),
  );
  const typingStates = useRef<string>(TYPING_STATE.FOCUS);
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
   */
  useEffect(() => {
    focusTextarea();
  }, []);

  useEffect(() => {
    typingAccuracy.current = getTypingAccuracy({
      typingLength: typingStates.current.length - 1,
      wrongLength: typingStates.current.replaceAll(TYPING_STATE.CORRECT, TYPING_STATE.EMPTY).length - 1,
    });
  }, [textarea]);

  useEffect(() => {
    typingSpeed.current = getTypingSpeed({
      typingCount: typingCount.current,
      backspaceCount: backspaceCount.current,
      millisecond: totalMillisecond,
    });
    typingWpm.current = getTypingWpm({
      typingCount: typingCount.current,
      millisecond: totalMillisecond,
    });
  }, [status, textarea, totalMillisecond]);

  const onAlertClick = () => {
    router.push(getNextPageURL(typingId, currentPage, totalPage));
  };

  const generateTypingInfo = () => {
    const endTime = Date.now();
    const typingTime = totalMillisecond;
    return {
      contentType: true,
      typingId,
      page: currentPage,
      resultContent: textarea,
      startTime: new Date(endTime - typingTime),
      endTime: new Date(endTime),
      typingAccuracy: typingAccuracy.current,
      typingSpeed: typingSpeed.current,
      wpm: typingWpm.current,
      mode: 'PRACTICE',
      wrongKeys: getWrongKeys(originalInfos.current, userInfos.current),
    };
  };

  /**
   * 사용자가 타이핑을 할 경우 상태 변화
   * textarea의 value를 기본적으로 바꾸고
   * 원본 긴 글과 사용자가 타이핑한 글의 정보를 업데이트한다.
   * 한글의 경우 더하거나 지우더라도 value의 길이가 변하지 않는 경우 존재하여
   * 해당 경우에 대한 경우의 수 처리
   */
  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 타이핑 시작시 타이머 동작
    if (status === 'stop') {
      timePlay();
    }

    const { value } = e.target;

    const textareaLength = value.length;
    const typingLength = typingStates.current.length - 1;
    const contentLength = originalInfos.current.length;

    // 타이핑 완료시 api 호출
    if (textareaLength > contentLength) {
      timePause();
      if (userProfile) {
        await getTypingHistoryAPI(generateTypingInfo());
      }
      handleResultModalToggle();
      return;
    }

    setTextarea(value);

    // 한글처럼 여러 글쇠로 이루어진 문자의 경우 타이핑을 해도 길이가 동일한 경우 발생, 빼는 경우도 마찬가지
    if (textareaLength === typingLength) {
      const prevComponents = userInfos.current[textareaLength - 1].components;

      userInfos.current[textareaLength - 1] = {
        char: value[textareaLength - 1],
        type: getCharType(value[textareaLength - 1]),
        components: disassemble(value[textareaLength - 1]),
      };

      const currComponents = userInfos.current[textareaLength - 1].components;

      // 한글을 뺀 경우 (길이 변화 X)
      if (prevComponents > currComponents) {
        if (originalInfos.current[textareaLength - 1].char === value[textareaLength - 1]) {
          typingStates.current = typingStates.current.slice(0, -2) + TYPING_STATE.CORRECT + TYPING_STATE.FOCUS;
          typingCount.current +=
            userInfos.current[textareaLength - 1].components.length; /* 현재 글자의 글쇠를 타수에 더함 */
        } else {
          typingStates.current = typingStates.current.slice(0, -2) + TYPING_STATE.INCORRECT + TYPING_STATE.FOCUS;
        }
      }
      // 한글을 더한 경우 (길이 변화 X)
      else {
        if (originalInfos.current[textareaLength - 1].char === value[textareaLength - 1]) {
          typingStates.current = typingStates.current.slice(0, -2) + TYPING_STATE.CORRECT + TYPING_STATE.FOCUS;
          typingCount.current += userInfos.current[textareaLength - 1].components.length;
        } else {
          typingStates.current = typingStates.current.slice(0, -2) + TYPING_STATE.INCORRECT + TYPING_STATE.FOCUS;
        }
      }
    }
    // 타이핑하여 글자가 증가한 경우
    else if (textareaLength > typingLength) {
      userInfos.current[textareaLength - 1] = {
        char: value[textareaLength - 1],
        type: getCharType(value[textareaLength - 1]),
        components: disassemble(value[textareaLength - 1]),
      };

      if (originalInfos.current[textareaLength - 1].char === userInfos.current[textareaLength - 1].char) {
        typingStates.current = typingStates.current.slice(0, -1) + TYPING_STATE.CORRECT + TYPING_STATE.FOCUS;
        typingCount.current += userInfos.current[textareaLength - 1].components.length;
      } else {
        typingStates.current = typingStates.current.slice(0, -1) + TYPING_STATE.INCORRECT + TYPING_STATE.FOCUS;
      }
    }
    // 빼서 글자가 감소한 경우
    else if (textareaLength < typingLength) {
      userInfos.current[textareaLength] = {
        char: '',
        type: 'other',
        components: [],
      };

      backspaceCount.current += 1; /* TODO : 타이핑을 엄청 틀린 후 지울 경우 예외처리 */
      typingStates.current = typingStates.current.slice(0, -2) + TYPING_STATE.FOCUS;
    }
  };

  const insertTab = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      typingStates.current = typingStates.current.slice(0, -1) + '  ' + TYPING_STATE.FOCUS;
      setTextarea((prev) => prev + '  ');
    }
  };

  const handleExit = () => {
    router.push(PRACTICE_LONG_PATH_LIST);
  };

  return (
    <>
      <LongLayout>
        <TypingHeader
          type='practice'
          accuracy={typingAccuracy.current}
          speed={typingSpeed.current}
          wpm={typingWpm.current}
          time={totalMillisecond / 1000}
          onExit={handleExit}
        />
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
            onKeyDown={insertTab}
          />
          {slicedContentAndStrings(content, textarea, typingStates.current).map(
            ([originalLine, userLine, states], i) => (
              <TypingLine key={i} originalLine={originalLine} userLine={userLine} states={states} />
            ),
          )}
        </Flex>
        <Flex mt='33px' justifyContent='right'>
          <TypingDetailPagination typingId={typingId} currentPage={currentPage} totalPage={totalPage} isTyping={true} />
        </Flex>
      </LongLayout>
      <PracticeResultModal
        title={`${title} (${currentPage}/${totalPage})`}
        isOpen={isResultModalOpen}
        onAction={onAlertClick}
        // TODO : "이어하기" 버튼 누르면 다음 페이지로 이동, 마지막 페이지면 "다시하기"로? @윤우
        actionLabel={currentPage === totalPage ? '목록으로' : '이어하기'}
        result={{
          typingAccuracy: typingAccuracy.current,
          typingSpeed: typingSpeed.current,
          typingTime: Math.floor(totalMillisecond / 1000), // 밀리초에서 초로 변환
          typingWpm: typingWpm.current,
        }}
        endTime={new Date()}
      />
    </>
  );
}

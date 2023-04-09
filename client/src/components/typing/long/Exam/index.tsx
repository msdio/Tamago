import { Flex, Textarea } from '@chakra-ui/react';
import { disassemble } from 'hangul-js';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { examPenaltiesAPI, getTypingHistoryAPI } from '@/apis/typing';
import { userProfileState } from '@/atoms/userProfile';
import Confirm from '@/components/common/Confirm';
import ExamResultModal from '@/components/common/ResultModal/exam-mode';
import LongLayout from '@/components/typing/long/Layout';
import TypingHeader from '@/components/typing/long/TypingHeader';
import TypingLine from '@/components/typing/long/TypingLine';
import { ACTUAL_LONG_CHOICE_PATH } from '@/constants/paths';
import { ACTUAL_TYPING_TIME_LIMIT, TYPING_STATE } from '@/constants/typing';
import useStopwatch from '@/hooks/useStopWatch';
import useToggle from '@/hooks/useToggle';
import type { CharInfo, LongTypingDetail } from '@/types/typing';
import { getCharType } from '@/utils/char';
import { getTypingAccuracy, getTypingSpeed, getTypingWpm, getWrongKeys, slicedContentAndStrings } from '@/utils/typing';

export default function ExamLongTyping({
  content,
  currentPage,
  language,
  title,
  totalPage,
  typingId,
}: LongTypingDetail) {
  const router = useRouter();

  const userProfile = useRecoilValue(userProfileState);

  const [isResultModalOpen, , { toggleOn: resultToggleOn }] = useToggle();
  const [isExitModalOpen, , { toggleOn: exitToggleOn, toggleOff: exitToggleOff }] = useToggle();

  const [textarea, setTextarea] = useState('');
  // 실전 도중 나가는 경우를 위한 상태
  const [{ penalty, nextRoute }, setPenalty] = useState<{ penalty: boolean | null; nextRoute: string }>({
    penalty: null,
    nextRoute: router.asPath,
  });
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

  const onModalButtonClick = () => {
    router.reload();
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
      mode: 'PRACTICE' /* todo: EXAM으로 수정 */,
      wrongKeys: getWrongKeys(originalInfos.current, userInfos.current),
    };
  };

  const finishTyping = async () => {
    timePause();
    setPenalty({ penalty: false, nextRoute });
    if (!userProfile) return;
    await getTypingHistoryAPI(generateTypingInfo());
    resultToggleOn();
  };

  const onExitButtonClick = () => {
    setPenalty({ penalty: true, nextRoute });
  };

  const setTypingAccuracy = () => {
    typingAccuracy.current = getTypingAccuracy({
      typingLength: typingStates.current.length - 1,
      wrongLength: typingStates.current.replaceAll(TYPING_STATE.CORRECT, TYPING_STATE.EMPTY).length - 1,
    });
  };

  const setTypingSpeed = () => {
    typingSpeed.current = getTypingSpeed({
      typingCount: typingCount.current,
      backspaceCount: backspaceCount.current,
      millisecond: totalMillisecond,
    });
  };

  const setTypingWpm = () => {
    typingWpm.current = getTypingWpm({
      typingCount: typingCount.current,
      millisecond: totalMillisecond,
    });
  };

  const penaltisTyping = async () => {
    try {
      await examPenaltiesAPI(language);
    } catch (error) {}
  };

  /**
   * 처음 화면이 렌더링될 때 textarea로 포커싱되도록 한다.
   * textarea는 숨겨두었기 때문에 사용자가 보고 포커싱할 수 없다.
   */
  useEffect(() => {
    focusTextarea();

    const onRouteChange = (route: string) => {
      if (penalty === null) {
        exitToggleOn();
        // timePause(); // 여기에 timePause을 하면 동작을 하지 않는다! 콜백 함수 내부기 때문이라고 추측 중
        setPenalty({ penalty, nextRoute: route });
        router.events.emit('routeChangeError');
        throw 'routeChange aborted';
      }
    };

    const cleanUpFunction = () => {
      router.events.off('routeChangeStart', onRouteChange);
    };

    router.events.on('routeChangeStart', onRouteChange);

    if (penalty) {
      penaltisTyping();
      router.replace(nextRoute);
      return cleanUpFunction;
    }

    return cleanUpFunction;
  }, [penalty]);

  useEffect(() => {
    setTypingAccuracy();
  }, [textarea]);

  useEffect(() => {
    // 타임 아웃
    if (ACTUAL_TYPING_TIME_LIMIT.LONG <= totalMillisecond) {
      finishTyping();
    } else {
      setTypingSpeed();
      setTypingWpm();
    }
  }, [status, textarea, totalMillisecond]);

  /**
   * 사용자가 타이핑을 할 경우 상태 변화
   * textarea의 value를 기본적으로 바꾸고
   * 원본 긴 글과 사용자가 타이핑한 글의 정보를 업데이트한다.
   * 한글의 경우 더하거나 지우더라도 value의 길이가 변하지 않는 경우 존재하여
   * 해당 경우에 대한 경우의 수 처리
   */
  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 타이핑 시작시 타이머 동작
    timePlay();

    const { value } = e.target;

    const textareaLength = value.length;
    const typingLength = typingStates.current.length - 1;
    const contentLength = originalInfos.current.length;

    // 타이핑 완료시 api 호출
    if (textareaLength > contentLength) {
      finishTyping();
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

  const handleExit = () => {
    timePause();
    router.push(ACTUAL_LONG_CHOICE_PATH);
  };

  return (
    <>
      <LongLayout>
        <TypingHeader
          type='exam'
          accuracy={typingAccuracy.current}
          speed={typingSpeed.current}
          wpm={typingWpm.current}
          time={Math.floor(ACTUAL_TYPING_TIME_LIMIT.LONG / 1000) - Math.floor(totalMillisecond / 1000)} // 타이머에서 현재 경과시간 뺀 값
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
          />
          {slicedContentAndStrings(content, textarea, typingStates.current).map(
            ([originalLine, userLine, states], i) => (
              <TypingLine key={i} originalLine={originalLine} userLine={userLine} states={states} />
            ),
          )}
        </Flex>
      </LongLayout>
      <Confirm
        header='중간에 종료하시면 페널티가 부과됩니다. 정말로 그만 두시겠어요?'
        isOpen={isExitModalOpen}
        onClose={() => {
          timePlay();
          exitToggleOff();
        }}
        onAction={onExitButtonClick}
        actionLabel='그만하기'
        closeLabel='계속하기'
      />
      <ExamResultModal
        isOpen={isResultModalOpen}
        actionLabel='다시하기'
        onAction={onModalButtonClick}
        result={{
          typingAccuracy: typingAccuracy.current,
          typingSpeed: typingSpeed.current,
          typingTime: Math.floor(totalMillisecond / 1000),
          typingWpm: typingWpm.current,
        }}
        endTime={new Date()}
        mode='long'
      />
    </>
  );
}

import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import Confirm from '@/components/common/Confirm';
import ExamResultModal from '@/components/common/ResultModal/exam-mode';
import PracticeResultModal from '@/components/common/ResultModal/practice-mode';
import useActualShortTyping from '@/components/typing/short/_hook/useActualShortTyping';
import usePracticeShortTyping from '@/components/typing/short/_hook/usePracticeShortTyping';
import { TYPING_MODE } from '@/constants/typing';
import type { CurrentTypingActionType, CurrentTypingInfoType, PrevNextTypingInfoType } from '@/types/shortTyping';
import type { TypingMode } from '@/types/typing';

type ContextCurrentTypingInfoType = CurrentTypingInfoType;
type ContextPrevNextTypingInfoType = PrevNextTypingInfoType;
type ContextCurrentTypingHandlerType = CurrentTypingActionType;

const ContextCurrentTypingInfo = createContext<ContextCurrentTypingInfoType | null>(null);
const ContextShortTypingHandler = createContext<ContextCurrentTypingHandlerType | null>(null);
const ContextPrevNextTypingInfo = createContext<ContextPrevNextTypingInfoType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  originalTypings: ShortTypingType[];
  mode: TypingMode;
}

const ShortTypingProvider = ({ children, originalTypings, mode }: ShortTypingProviderProps) => {
  const practiceValues = usePracticeShortTyping(originalTypings);
  const actualValues = useActualShortTyping(originalTypings);

  const { currentTypingInfos, currentTypingActions, endGameValue, prevNextTypingInfo } =
    mode === 'PRACTICE' ? practiceValues : actualValues;

  return (
    <ContextCurrentTypingInfo.Provider value={currentTypingInfos}>
      <ContextShortTypingHandler.Provider value={currentTypingActions}>
        <ContextPrevNextTypingInfo.Provider value={prevNextTypingInfo}>
          {children}

          <Confirm
            header={'정말로 그만 두시겠어요?'}
            isOpen={endGameValue.isExitModalOpen}
            onClose={endGameValue.handleExitModalClose}
            onAction={endGameValue.handleResultModalOpen}
            actionLabel='그만하기'
            closeLabel='계속하기'
          />
          {mode === 'PRACTICE' && (
            <PracticeResultModal
              isOpen={endGameValue.isResultModalOpen}
              result={endGameValue.result}
              endTime={endGameValue.endTime}
              onAction={endGameValue.handleReplay}
              actionLabel='다시하기'
            />
          )}
          {mode === TYPING_MODE.ACTUAL && (
            <ExamResultModal
              isOpen={endGameValue.isResultModalOpen}
              result={endGameValue.result}
              endTime={endGameValue.endTime}
              onAction={endGameValue.handleReplay}
              isLoading={actualValues.isSubmitLoading}
              actionLabel='다시하기'
              mode='short'
            />
          )}
        </ContextPrevNextTypingInfo.Provider>
      </ContextShortTypingHandler.Provider>
    </ContextCurrentTypingInfo.Provider>
  );
};

export function useContextShortTyping() {
  const value = useContext(ContextCurrentTypingInfo);
  if (value === null) {
    throw new Error('useContextShortTyping should be used within ShortTypingProvider');
  }

  return value;
}

export function useContextShortTypingHandler() {
  const value = useContext(ContextShortTypingHandler);
  if (value === null) {
    throw new Error('useContextShortTypingHandler should be used within ShortTypingHandlerProvider');
  }

  return value;
}

export function useContextPrevNextTypingInfo() {
  const value = useContext(ContextPrevNextTypingInfo);
  if (value === null) {
    throw new Error('useContextPrevNextTypingInfo should be used within ShortTypingHandlerProvider');
  }

  return value;
}

export default ShortTypingProvider;

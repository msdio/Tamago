import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import Confirm from '@/components/common/Confirm';
import PracticeResultModal from '@/components/common/ResultModal/practice-mode';
import type { CurrentTypingActionType, CurrentTypingInfoType, PrevNextTypingInfoType } from '@/types/shortTyping';
import type { TypingMode } from '@/types/typing';

import useActualShortTyping from './useActualShortTyping';
import usePracticeShortTyping from './usePracticeShortTyping copy';

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
  const {
    currentTypingInfos: practiceValues,
    currentTypingActions: practiceActions,
    endGameValue: practiceEndGameValue,
    prevNextTypingInfo,
  } = usePracticeShortTyping(originalTypings);

  const {
    currentTypingInfos: actualValues,
    currentTypingActions: actualActions,
    endGameValue: actualEndGameValue,
  } = useActualShortTyping(originalTypings);

  const { currentTypingInfos, currentTypingActions, endGameValue } =
    mode === 'PRACTICE'
      ? {
          currentTypingInfos: practiceValues,
          currentTypingActions: practiceActions,
          endGameValue: practiceEndGameValue,
        }
      : { currentTypingInfos: actualValues, currentTypingActions: actualActions, endGameValue: actualEndGameValue };

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
              onReplay={endGameValue.handleReplay}
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

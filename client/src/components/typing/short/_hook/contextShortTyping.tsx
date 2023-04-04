import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import type { ShortTypingType } from '@/apis/typing';
import Confirm from '@/components/common/Confirm';
import PracticeResultModal from '@/components/common/ResultModal/practice-mode';

import usePracticeShortTyping from './useActualShortTyping';
import useActualShortTyping from './useActualShortTyping';

interface ContextShortTypingType {
  originalTyping: string;
  userTyping: string;

  time: number;
  typingCount: number;
  typingWpm: number;
  typingAccuracy: number;
  typingSpeed: number;

  prevUserTyping: string;
  prevOriginalTyping: string;
  nextOriginalTyping: string;

  // typingAvgResult: TypingResultType;
}

interface ContextShortTypingHandlerType {
  onEndTyping: (input: string) => Promise<void>;
  onTyping: (inputChar: string) => void;

  onExit: () => void;
}

const ContextShortTyping = createContext<ContextShortTypingType | null>(null);
const ContextShortTypingHandler = createContext<ContextShortTypingHandlerType | null>(null);

interface ShortTypingProviderProps {
  children: ReactNode;
  originalTypings: ShortTypingType[];
  mode: 'PRACTICE' | 'test';
}

const ShortTypingProvider = ({ children, originalTypings, mode }: ShortTypingProviderProps) => {
  const {
    values: practiceValues,
    actions: practiceActions,
    endGameValue: practiceEndGameValue,
  } = usePracticeShortTyping(originalTypings);

  const {
    values: actualValues,
    actions: actualActions,
    endGameValue: actualEndGameValue,
  } = useActualShortTyping(originalTypings);

  const { values, actions, endGameValue } =
    mode === 'PRACTICE'
      ? { values: practiceValues, actions: practiceActions, endGameValue: practiceEndGameValue }
      : { values: actualValues, actions: actualActions, endGameValue: actualEndGameValue };

  return (
    <ContextShortTyping.Provider value={values}>
      <ContextShortTypingHandler.Provider value={actions}>
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
            result={endGameValue.typingAvgResult}
            endTime={endGameValue.endTime}
            onReplay={endGameValue.handleReplay}
          />
        )}
      </ContextShortTypingHandler.Provider>
    </ContextShortTyping.Provider>
  );
};

export function useContextShortTyping() {
  const value = useContext(ContextShortTyping);
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

export default ShortTypingProvider;

import type { TypingResultType } from './typing';

export interface CurrentTypingInfoType {
  originalTyping: string;
  userTyping: string;
  typingTime: number;
  typingCount: number;
  typingSpeed: number;
  typingAccuracy: number;
  typingWpm: number;

  index: number;
}

export interface PrevNextTypingInfoType {
  prevUserTyping: string;
  prevOriginalTyping: string;
  nextOriginalTyping: string;
}

export interface EndGameValueType {
  result: TypingResultType;
  endTime: Date;
  isExitModalOpen: boolean;
  isResultModalOpen: boolean;
  handleExitModalOpen: () => void;
  handleExitModalClose: () => void;
  handleResultModalOpen: () => void;
  handleReplay: () => void;
}

export interface CurrentTypingActionType {
  onEndTyping: (input: string) => Promise<void>;
  onTyping: (input: string) => void;
  onExit: () => void;
}

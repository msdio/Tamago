import { Box, Flex, Text } from '@chakra-ui/react';

import Confirm from '@/components/common/Confirm';
import ResultModal from '@/components/common/ResultModal/practice-mode';
import {
  useContextShortTyping,
  useContextShortTypingHandler,
} from '@/components/practice/short/_hook/contextShortTyping';
import CurrentTyping from '@/components/practice/short/CurrentTyping';
import InfoBar from '@/components/practice/short/InfoBar';
import PrevTyping from '@/components/practice/short/PrevTyping';
import useToggle from '@/hooks/useToggle';
import TwoRightArrow from '@/icons/TwoRightArrow';

export default function PracticeShort() {
  // TODO : short typing result 평균으로 받아오기
  const { originalTyping, nextOriginalTyping, time, typingSpeed, typingWpm, typingAccuracy } = useContextShortTyping();
  const { timePlay, timePause } = useContextShortTypingHandler();

  const [isResultModalOpen, handleResultModalToggle] = useToggle();
  const [isExitModalOpen, handleExitModalToggle] = useToggle();

  const handleExitModalOpen = () => {
    timePause();
    handleExitModalToggle();
  };

  const handleExitModalClose = () => {
    timePlay();
    handleExitModalToggle();
  };

  const handleResultModalOpen = () => {
    handleExitModalToggle();
    handleResultModalToggle();
  };

  return (
    <Box p='35px 120px' minW='1100px'>
      <InfoBar onExit={handleExitModalOpen} />

      {originalTyping && (
        <Box position='relative' border='0.6px solid #000000' borderRadius='30px 0px 0px 0px' mt='28px'>
          <PrevTyping />

          <CurrentTyping />

          <Flex p='24px 40px 32px' alignItems='center' gap='16.18px'>
            <TwoRightArrow />
            <Text fontSize='20px' color='#3C3C3C'>
              {nextOriginalTyping}
            </Text>
          </Flex>
        </Box>
      )}
      {/* 나가기 모달에서, 계속하기를 누르면 다시 경과시간 카운트를 증가? */}
      <Confirm
        header={'정말로 그만 두시겠어요?'}
        isOpen={isExitModalOpen}
        onClose={handleExitModalClose}
        onAction={handleResultModalOpen}
        actionLabel='그만하기'
        closeLabel='계속하기'
      />
      <ResultModal
        isOpen={isResultModalOpen}
        onReplay={handleResultModalToggle}
        result={{
          typingSpeed,
          typingWpm,
          typingAccuracy,
          typingTime: time,
        }}
      />
    </Box>
  );
}

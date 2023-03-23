import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Confirm from '@/components/common/Confirm';
import {
  useContextShortTyping,
  useContextTypingResultModal,
} from '@/components/practice/short/_hook/contextShortTyping';
import GrassEllipse from '@/components/practice/short/InfoBar/GrassEllipse';
import InfoBarItem from '@/components/practice/short/InfoBar/InfoBarItem';
import ModeList from '@/components/practice/short/InfoBar/ModeList';
import { Exit } from '@/icons/Exit';
import { getSecondToMMSSFormat } from '@/utils/time';

// TODO : 짧은글, 긴글에서 공통적으로 사용됨
export default function InfoBar() {
  const { time, typingAccuracy, typingCount, typingWpm } = useContextShortTyping();
  const { isResultModalOpen, handleResultModalOpen } = useContextTypingResultModal();
  const [isExitModalOpen, setIsExitModalOpen] = useState(true);
  const onToggleExitModal = () => setIsExitModalOpen((prev) => !prev);

  return (
    <>
      <Flex gap='24px'>
        <Flex
          justifyContent='center'
          alignItems='center'
          w='118px'
          bg='#CEF0FF'
          border=' 0.6px solid #000000'
          borderRadius={10}
          pos='relative'
          overflow='hidden'
        >
          <Box pos='absolute' top='52px'>
            <GrassEllipse />
          </Box>
          <Box pos='absolute' top='32px'>
            <Image src='/images/home/white-chicken.png' alt='white-chicken' width={70} height={70} />
          </Box>
        </Flex>
        <Box flex={1}>
          <Flex justifyContent='space-between'>
            <ModeList />
            <Center w='38px' h='38px' border='0.6px solid #000000' bg='background.white' borderRadius='50%'>
              <Exit />
            </Center>
          </Flex>

          <Flex border='1px solid rgb(0, 0, 0)' borderRadius={10} h={'56px'}>
            <InfoBarItem label='경과 시간' content={getSecondToMMSSFormat(time)} />
            <InfoBarItem label='WPM' content={`${typingWpm}`} />
            <InfoBarItem label='정확도' content={`${typingAccuracy}%`} />
            <InfoBarItem label='타자' content={`${typingCount}타`} />

            <Flex pr={27} borderLeft='1px solid #000' flex={1} flexDirection='row-reverse' alignItems='center' gap={1}>
              <Text fontWeight={600} fontSize={16}>
                님
              </Text>
              <Text fontWeight={800} fontSize={16}>
                타마고
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Confirm
        header={'정말로 그만 두시겠어요?'}
        isOpen={isExitModalOpen}
        onClose={onToggleExitModal}
        onAction={handleResultModalOpen}
        actionLabel='그만하기'
        closeLabel='계속하기'
      />
    </>
  );
}

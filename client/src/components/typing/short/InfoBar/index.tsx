import { Box, Flex, Image, Text } from '@chakra-ui/react';

import IconButton from '@/components/common/IconButton';
import { useContextShortTyping } from '@/components/typing/short/_hook/contextShortTyping';
import GrassEllipse from '@/components/typing/short/InfoBar/GrassEllipse';
import InfoBarItem from '@/components/typing/short/InfoBar/InfoBarItem';
import { ACTUAL_TYPING_TIME_LIMIT, TYPING_MODE } from '@/constants/typing';
import { Exit } from '@/icons/Exit';
import type { TypingMode } from '@/types/typing';
import { getSecondToMMSSFormat } from '@/utils/time';

interface InfoBarProps {
  onExit: () => void;
  mode: TypingMode;
}

// TODO : 짧은글, 긴글에서 공통적으로 사용됨
export default function InfoBar({ onExit, mode }: InfoBarProps) {
  const { typingTime, typingAccuracy, typingSpeed, typingWpm } = useContextShortTyping();

  const timeLabel = mode === TYPING_MODE.PRACTICE ? '경과 시간' : '남은 시간';
  const timeTextValue =
    mode === TYPING_MODE.PRACTICE
      ? getSecondToMMSSFormat(typingTime)
      : getSecondToMMSSFormat(ACTUAL_TYPING_TIME_LIMIT.SHORT - typingTime);

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
            <Box w='fit-content' position='relative'>
              <Flex
                mb='21px'
                alignItems='center'
                gap='8.5px'
                border='0.6px solid #000000'
                bg='#BCF075'
                w='fit-content'
                p='10px 23px'
                borderRadius={30}
                h='38px'
              >
                <Text fontSize='18px' fontWeight={500}>
                  짧은 글 {mode === TYPING_MODE.PRACTICE ? '연습모드 ' : '실전모드'}
                </Text>
              </Flex>
            </Box>
            <IconButton icon={<Exit />} onAction={onExit} />
          </Flex>

          <Flex border='1px solid rgb(0, 0, 0)' borderRadius={10} h='56px' bg='#fff'>
            <InfoBarItem label={timeLabel} content={timeTextValue} />
            <InfoBarItem label='WPM' content={`${typingWpm}`} />
            <InfoBarItem label='정확도' content={`${typingAccuracy}%`} />
            <InfoBarItem label='타자' content={`${typingSpeed}타`} />

            <Flex pr={27} borderLeft='1px solid #000' flex={1} flexDirection='row-reverse' alignItems='center' gap={1}>
              <Text fontWeight={600} fontSize={16}>
                님
              </Text>
              <Text fontWeight={800} fontSize={16}>
                {/* TODO : user name 추가 */}
                타마고
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

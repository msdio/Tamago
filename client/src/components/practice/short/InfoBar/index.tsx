import { Box, Flex, Text } from '@chakra-ui/react';

import InfoBarItem from '@/components/practice/short/InfoBar/InfoBarItem';
import DownArrow from '@/icons/DownArrow';
import { getSecondToMMSSFormat } from '@/utils/time';

interface InfoBarProps {
  time: number;
  wpm: number;
  accuracy: number;
  typist: number;
}

function InfoBar({ time, wpm, accuracy, typist }: InfoBarProps) {
  return (
    <Flex gap='24px'>
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
            짧은 글 연습모드
          </Text>

          <DownArrow />
        </Flex>

        <Flex border='1px solid rgb(0, 0, 0)' borderRadius={10} h={'56px'}>
          <InfoBarItem label='경과 시간' content={getSecondToMMSSFormat(time)} />
          <InfoBarItem label='WPM' content={`${wpm}`} />
          <InfoBarItem label='정확도' content={`${accuracy}%`} />
          <InfoBarItem label='타자' content={`${typist}타`} />

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
  );
}
export default InfoBar;

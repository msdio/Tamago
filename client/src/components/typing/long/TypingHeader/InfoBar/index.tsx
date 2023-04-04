import { Center, Divider, Flex, Text } from '@chakra-ui/react';

import InfoBarItem from '@/components/typing/long/TypingHeader/InfoBar/InfoBarItem';
import { getSecondToMMSSFormat } from '@/utils/time';

interface InfoBarProps {
  type: 'practice' | 'exam';
  time: number;
  wpm: number;
  accuracy: number;
  speed: number;
}

function InfoBar({ type, time, wpm, accuracy, speed }: InfoBarProps) {
  return (
    <Flex border='1px solid rgb(0, 0, 0)' borderRadius={10} h={'56px'} backgroundColor='white'>
      <InfoBarItem label={type === 'practice' ? '경과 시간' : '남은 시간'} content={getSecondToMMSSFormat(time)} />
      <Center height='100%'>
        <Divider borderColor='black' orientation='vertical' />
      </Center>
      <InfoBarItem label='WPM' content={`${wpm}`} />
      <Center height='100%'>
        <Divider borderColor='black' orientation='vertical' />
      </Center>
      <InfoBarItem label='정확도' content={`${accuracy}%`} />
      <Center height='100%'>
        <Divider borderColor='black' orientation='vertical' />
      </Center>
      <InfoBarItem label='타자' content={`${speed}타`} />
      <Center height='100%'>
        <Divider borderColor='black' orientation='vertical' />
      </Center>
      {/* <Box p={25} borderLeft='1px solid #000' flex={1}></Box> */}
      <Flex pl={23} pr={27} flex={1} flexDirection='row-reverse' alignItems='center' gap={1}>
        <Text fontWeight={600} fontSize={16}>
          님
        </Text>
        <Text fontWeight={800} fontSize={16}>
          타마고
        </Text>
      </Flex>
    </Flex>
  );
}
export default InfoBar;

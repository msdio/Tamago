import { Flex, Text } from '@chakra-ui/react';

import InfoBarItem from '@/components/practice/short/InfoBar/InfoBarItem';
import { getSecondToMMSSFormat } from '@/utils/time';

interface InfoBarProps {
  time: number;
  wpm: number;
  accuracy: number;
  typist: number;
}

function InfoBar({ time, wpm, accuracy, typist }: InfoBarProps) {
  return (
    <Flex border='1px solid rgb(0, 0, 0)' borderRadius={10} h={'56px'}>
      <InfoBarItem label='경과 시간' content={getSecondToMMSSFormat(time)} />
      <InfoBarItem label='WPM' content={`${wpm}`} />
      <InfoBarItem label='정확도' content={`${accuracy}%`} />
      <InfoBarItem label='타자' content={`${typist}타`} />

      {/* <Box p={25} borderLeft='1px solid #000' flex={1}></Box> */}
      <Flex
        pl={23}
        pr={27}
        borderLeft='1px solid #000'
        flex={1}
        flexDirection='row-reverse'
        alignItems='center'
        gap={1}
      >
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

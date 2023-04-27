import { Flex, Text } from '@chakra-ui/react';

interface TotalInfoProps {
  writingCount: number;
  practiceCount: number;
  actualCount: number;
}
export default function TotalInfo({ writingCount, practiceCount, actualCount }: TotalInfoProps) {
  return (
    <Flex
      padding='24px 32px'
      border='0.6px solid'
      borderColor='gray.main'
      w='100%'
      bg='white.light'
      borderRadius='10px'
      flexDirection='column'
      justifyContent='space-between'
      h='100%'
    >
      <Flex justifyContent='space-between' w='100%'>
        <Text textStyle='text/subtitle'>쓴 글 </Text>
        <Text textStyle='text/regular'>{writingCount}개</Text>
      </Flex>
      <Flex justifyContent='space-between' w='100%'>
        <Text textStyle='text/subtitle'>연습 타자 </Text>
        <Text textStyle='text/regular'>{practiceCount}개</Text>
      </Flex>
      <Flex justifyContent='space-between' w='100%'>
        <Text textStyle='text/subtitle'>실전 타자</Text>
        <Text textStyle='text/regular'>{actualCount}개</Text>
      </Flex>
    </Flex>
  );
}

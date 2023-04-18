import { Flex, Text } from '@chakra-ui/react';

interface InfoBarItemProps {
  label: string;
  content: string;
}

function InfoBarItem({ label, content }: InfoBarItemProps) {
  return (
    <Flex
      minW='fit-content'
      gap='40px'
      justifyContent='space-between'
      alignItems='center'
      pl={22}
      pr={22}
      flex={1}
      color='#000'
    >
      <Text fontWeight={800} fontSize={16}>
        {label}
      </Text>
      <Text fontFamily={'GangwonEduPower'} fontSize={20} fontWeight={900} mt='3px'>
        {content}
      </Text>
    </Flex>
  );
}

export default InfoBarItem;

import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Wrapper = styled(Flex)`
  &:not(:first-of-type) {
    border-left: 1px solid #000;
  }
`;

interface InfoBarItemProps {
  label: string;
  content: string;
}

function InfoBarItem({ label, content }: InfoBarItemProps) {
  return (
    <Wrapper minW='60px' justifyContent='space-between' alignItems='center' pl={22} pr={22} flex={1} color='#000'>
      <Text minW='60px' fontWeight={800} fontSize={16}>
        {label}
      </Text>
      <Text minW='60px' textAlign='right' fontFamily={'GangwonEduPower'} fontSize={20} fontWeight={900} mt='3px'>
        {content}
      </Text>
    </Wrapper>
  );
}

export default InfoBarItem;

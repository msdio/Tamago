import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Wrapper = styled(Flex)`
  &:not(:first-child) {
    border-left: 1px solid #000;
  }
`;

interface InfoBarItemProps {
  label: string;
  content: string;
}

function InfoBarItem({ label, content }: InfoBarItemProps) {
  return (
    <Wrapper
      minW='fit-content'
      gap='40px'
      justifyContent='space-between'
      alignItems='center'
      pl={23}
      pr={27}
      flex={1}
      color='#000'
    >
      <Text fontWeight={800} fontSize={18} lineHeight='18px'>
        {label}
      </Text>
      <Text fontFamily={'GangwonEduPower'} fontSize={25} fontWeight={900} lineHeight='25px' mt='2px'>
        {content}
      </Text>
    </Wrapper>
  );
}

export default InfoBarItem;

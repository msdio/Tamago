import { Text } from '@chakra-ui/react';

export default function DivideWithOr() {
  return (
    <Text
      fontSize='15px'
      fontWeight='700'
      color='#BFBFBF'
      display='flex'
      alignItems='center'
      _before={{
        content: '""',
        flexGrow: 1,
        bg: '#BFBFBF',
        h: '0.6px',
        fontSize: '0px',
        lineHeight: '0px',
        m: '0 19px 0 6px',
      }}
      _after={{
        content: '""',
        flexGrow: 1,
        bg: '#BFBFBF',
        h: '0.6px',
        fontSize: '0px',
        lineHeight: '0px',
        m: '0 6px 0 19px',
      }}
    >
      OR
    </Text>
  );
}

import { Text } from '@chakra-ui/react';

export default function Or() {
  return (
    <Text
      fontSize='15px'
      fontWeight='700'
      color='#BFBFBF'
      display='flex'
      alignItems='center'
      m='41px 0px'
      _before={{
        content: '""',
        flexGrow: 1,
        bg: '#BFBFBF',
        h: '0.6px',
        fontSize: '0px',
        lineHeight: '0px',
        marginRight: '22px',
      }}
      _after={{
        content: '""',
        flexGrow: 1,
        bg: '#BFBFBF',
        h: '0.6px',
        fontSize: '0px',
        lineHeight: '0px',
        marginLeft: '22px',
      }}
    >
      OR
    </Text>
  );
}

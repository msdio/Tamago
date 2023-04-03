import { Box, Text } from '@chakra-ui/react';

const Hider = () => {
  return (
    <Box
      w='100vw'
      h='100vh'
      bgColor='black.dark'
      zIndex='9999'
      userSelect='none'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Text color='white.light' fontSize={32}>
        현재 화면 크기에서는 이용할 수 없습니다.
      </Text>
      <Text color='white.light' fontSize={32}>
        화면 크기를 키우거나 배율을 축소해주세요!
      </Text>
    </Box>
  );
};

export default Hider;

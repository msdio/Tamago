import { Box } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export default function SelectTrend({ children, isSelected }: PropsWithChildren<{ isSelected: boolean }>) {
  return (
    <Box
      lineHeight='26px'
      w='65px'
      textAlign='center'
      borderRadius='5px'
      borderColor={isSelected ? 'primary.main' : 'gray.main'}
      border='0.8px solid'
      color={isSelected ? 'primary.dark' : 'gray.dark'}
      bg={isSelected ? 'white.light' : 'gray.bright'}
      textStyle='text/small'
    >
      {children}
    </Box>
  );
}

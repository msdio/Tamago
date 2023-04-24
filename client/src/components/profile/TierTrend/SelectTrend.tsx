import { Box } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

interface SelectTrendProps {
  onClick: () => void;
  isSelected: boolean;
}
export default function SelectTrend({ children, onClick, isSelected }: PropsWithChildren<SelectTrendProps>) {
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
      cursor='pointer'
      onClick={onClick}
    >
      {children}
    </Box>
  );
}

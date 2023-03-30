import { Center } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface IconButtonProps {
  onAction: () => void;
  icon: ReactNode;
}

export default function IconButton({ onAction, icon }: IconButtonProps) {
  return (
    <Center
      onClick={onAction}
      cursor='pointer'
      w='38px'
      h='38px'
      border='0.6px solid #000000'
      bg='background.white'
      borderRadius='50%'
    >
      {icon}
    </Center>
  );
}

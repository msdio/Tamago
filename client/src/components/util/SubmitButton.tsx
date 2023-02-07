import { Button } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { FontBorderTheme, DEFAULT_BUTTON_THEME } from '../../constants/theme';

interface SubmitButtonProps {
  children?: string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset' | undefined;
  w?: string;
  h?: string;
  theme: FontBorderTheme;
  colorScheme?: string;
}

export default function SubmitButton({ children, onClick, type, w, h, theme, colorScheme }: SubmitButtonProps) {
  return (
    <Button
      onClick={onClick}
      type={type}
      w={w}
      h={h}
      fontFamily={theme.fontFamily}
      fontSize={theme.fontSize}
      fontWeight={theme.fontWeight}
      color={theme.color}
      border={theme.border}
      borderColor={theme.borderColor}
      borderRadius={theme.borderRadius}
      colorScheme={colorScheme}
    >
      {children}
    </Button>
  );
}

SubmitButton.defaultProps = {
  w: 'full',
  h: '59px',
  theme: DEFAULT_BUTTON_THEME,
};

import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const sizes = {
  lg: {
    fontSize: '18px',
    padding: '16px 20px',
    width: '490px',
    height: '60px',
  },
  md: {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '16px 20px',
    width: '236px',
    height: '60px',
  },
  sm: {
    fontSize: '18px',
    fontWeight: 'medium',
    padding: '16px 20px',
    width: '122px',
    height: '60px',
  },
  xs: {
    fontSize: '14px',
    fontWeight: 'medium',
    padding: '16px 20px',
    width: '96px',
    height: '36px',
  },
};

const baseVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.500`,
    border: '0.6px solid',
    color: `${c}.100`,

    _hover: {
      bg: `${c}.700`,
      border: '0.6px solid',
      _disabled: {
        bg: 'tamago-gray.500',
      },
    },
    _active: {
      bg: `${c}.700`,
      border: '0.6px solid',
      borderColor: `${c}.700`,
    },
    _disabled: {
      bg: 'tamago-gray.500',
      border: '0.6px solid',
      borderColor: 'tamago-gray.500',
    },
  };
});

const outlineVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.100`,
    color: `${c}.600`,
    border: '0.6px solid',

    _hover: {
      bg: `${c}.200`,
      _disabled: {
        bg: 'tamago-gray.500',
      },
    },
    _active: {
      bg: `${c}.200`,
    },
    _disabled: {
      bg: 'tamago-gray.500',
      border: '0.6px solid',
      borderColor: 'tamago-gray.500',
    },
  };
});

export const buttonTheme = defineStyleConfig({
  sizes,
  variants: {
    base: baseVariant,
    outline: outlineVariant,
  },
  defaultProps: {
    colorScheme: 'tamago',
    variant: 'base',
  },
});

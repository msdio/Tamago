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
    bg: `${c}.main`,
    color: 'white.light',

    _hover: {
      bg: `${c}.dark`,
      _disabled: {
        bg: 'gray.main',
      },
    },
    _active: {
      bg: `${c}.dark`,
      borderColor: `${c}.dark`,
    },
    _disabled: {
      bg: 'gray.main',
      borderColor: 'gray.main',
    },
  };
});

const outlineVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.light`,
    color: c === 'primary' ? 'white.light' : 'gray.dark',
    border: '0.6px solid',

    _hover: {
      bg: `${c}.main`,
      _disabled: {
        bg: 'gray.main',
      },
    },
    _active: {
      bg: `${c}.main`,
    },
    _disabled: {
      bg: 'gray.main',
      border: '0.6px solid',
      borderColor: 'gray.main',
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
    colorScheme: 'primary',
    variant: 'base',
  },
});

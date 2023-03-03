import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const sizes = {
  lg: {
    field: {
      fontSize: '15px',
      fontWeight: 'medium',
      padding: '16px 26px',
      width: '490px',
      height: '60px',
    },
  },
  md: {
    field: {
      fontSize: '15px',
      fontWeight: 'medium',
      padding: '16px 26px',
      width: '350px',
      height: '60px',
    },
  },
};

const baseVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    field: {
      bg: `${c}.100`,
      border: '1px solid',
      borderColor: 'gray.main',

      _placeholder: {
        fontWeight: 'regular',
        color: 'gray.main',
      },
      _focus: {
        borderColor: `${c}.500`,
      },
      _disabled: {
        bg: 'gray.light',
      },
    },
  };
});

export const inputTheme = defineStyleConfig({
  sizes,
  variants: {
    base: baseVariant,
  },
  defaultProps: {
    colorScheme: 'primary',
    variant: 'base',
  },
});

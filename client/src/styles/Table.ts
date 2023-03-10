import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const sizes = {};

const baseVariant = defineStyle(() => {
  return {
    bg: `white`,
    border: '0.6px solid black',
  };
});

const stripedReverseVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    border: '0.6px solid black',

    table: {
      fontWeight: `500`,
      bg: `white`,
      thead: {
        background: `${c}.head`,
        borderBottom: `0.6px solid black`,
      },
      tbody: {
        tr: {
          _even: {
            background: `${c}.even`,
          },
        },
      },
    },
  };
});

export const TableTheme = defineStyleConfig({
  sizes,
  variants: {
    'base': baseVariant,
    'striped-reverse': stripedReverseVariant,
  },
  defaultProps: {
    colorScheme: 'table',
    variant: 'base',
  },
});

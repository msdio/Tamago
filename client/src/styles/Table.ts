import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const sizes = {};

const baseVariant = defineStyle(() => {
  return {};
});

const stripedReverseVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    table: {
      borderCollapse: 'collapse',
      bg: `white`,
      fontWeight: `500`,
      thead: {
        background: `${c}.head`,
        borderBottom: `0.6px solid black`,
      },
      tbody: {
        tr: {
          _even: {
            bg: `${c}.even`,
          },
        },
      },
      th: {
        h: `56px`,
        color: `${c}.head-text`,
        fontSize: `16px`,
      },
      td: {
        h: `56px`,
        fontSize: `16px`,
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

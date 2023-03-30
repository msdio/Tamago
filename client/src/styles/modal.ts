import { defineStyleConfig, theme } from '@chakra-ui/react';

export const modalTheme = defineStyleConfig({
  ...theme.components.Modal,
  sizes: {
    md: {
      dialog: {
        borderRadius: '20px',
      },
    },
  },
  variants: {},
  defaultProps: {},
});

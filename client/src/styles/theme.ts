import type { StyleConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import colors from '@/styles/colors';
import styles from '@/styles/styles';

import { TableTheme } from './Table';
import { buttonTheme } from './buttons';

const components: Record<string, StyleConfig> = {
  Button: buttonTheme,
  Input: inputTheme,
  Table: TableTheme,
};

const theme = extendTheme({
  styles,
  colors,
  components,
});

export default theme;

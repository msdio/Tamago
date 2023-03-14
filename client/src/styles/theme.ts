import type { StyleConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import colors from '@/styles/colors';
import styles from '@/styles/styles';

import { buttonTheme } from './buttons';
import { inputTheme } from './inputs';
import { tableTheme } from './table';

const components: Record<string, StyleConfig> = {
  Button: buttonTheme,
  Input: inputTheme,
  Table: tableTheme,
};

const theme = extendTheme({
  styles,
  colors,
  components,
});

export default theme;

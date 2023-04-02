import type { StyleConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import colors from '@/styles/colors';
import { modalTheme } from '@/styles/modal';
import styles from '@/styles/styles';

import { buttonTheme } from './buttons';
import { inputTheme } from './inputs';
import { tableTheme } from './table';
import textStyles from './typo';

const components: Record<string, StyleConfig> = {
  Button: buttonTheme,
  Input: inputTheme,
  Table: tableTheme,
  Modal: modalTheme,
};

const theme = extendTheme({
  styles,
  colors,
  components,
  textStyles,
});

export default theme;

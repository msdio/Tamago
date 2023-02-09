import { buttonTheme } from '@/styles/Button';
import { extendTheme, StyleConfig } from '@chakra-ui/react';

export interface FontBorderTheme {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  color: string;
  border: string;
  borderColor: string;
  borderRadius: string;
}

export const DEFAULT_BUTTON_THEME: FontBorderTheme = {
  fontFamily: 'Pretendard',
  fontSize: '17px',
  fontWeight: '700',
  color: '#FFFFFF',
  border: '',
  borderColor: '',
  borderRadius: '5px',
};

export const EMAIL_BUTTON_THEME: FontBorderTheme = {
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontWeight: '400',
  color: '#808080',
  border: '0.6px solid',
  borderColor: '#BFBFBF',
  borderRadius: '5px',
};

export const DEFAULT_INPUT_THEME: FontBorderTheme = {
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontWeight: '400',
  color: '#808080',
  border: '0.6px solid',
  borderColor: '#BFBFBF',
  borderRadius: '5px',
};

type ColorProperty = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorType = Record<ColorProperty, string>;

/**
 * 100: button outline bg,
 * 200: button outline hover bg,
 * 500: disable, basic
 * 600: outline button text color,
 * 700: button pressed,
 */
const colors: Record<string, ColorType> = {
  tamago: {
    100: '#ffffff',
    200: '#fffaf8',
    300: '#ff701e',
    400: '#FF8A65',
    500: '#FF8A65', //basic
    600: '#FF8A65',
    700: '#FF6A3C',
    800: '#FF6A3C',
    900: '#FF6A3C',
  },
  secondary: {
    100: '#F5F5F5', // fill
    200: '#F5F5F5',
    300: '#F5F5F5',
    400: '#BFBFBF',
    500: '#BFBFBF', // disable
    600: '#808080',
    700: '#808080',
    800: '#808080',
    900: '#808080', // text
  },
  // NOTE: 삭제?
  tamago_gray: {
    100: '#fffaf8', // hover 등
    200: '#ff7a29',
    300: '#ff701e',
    400: '#ff6611',
    500: '#F5F5F5', // basic color
    600: '#F5F5F5', // hover?
    700: '#F5F5F5', // click?
    800: '#dc3d00',
    900: '#d23400',
  },
};

const components: Record<string, StyleConfig> = {
  Button: buttonTheme,
};

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        h: 'full',
        m: '0',
        p: '0',
        fontFamily: 'Pretendard',
      },
      // footer 바닥에 붙어있게 하기 위한 css
      '#__next': {
        h: 'full',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Pretendard',
      },
    },
  },
  colors,
  components,
});

export default theme;

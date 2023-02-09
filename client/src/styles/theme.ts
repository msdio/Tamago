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

const colors: Record<string, ColorType> = {
  tamago: {
    100: '#fffaf8', // hover 등
    200: '#ff7a29',
    300: '#ff701e',
    400: '#ff6611',
    500: '#FF8A65', // basic color
    600: '#FF7A3C',
    700: '#FF6A3C',
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
  Button: {
    defaultProps: {
      colorScheme: 'tamago',
    },
    sizes: {
      lg: {
        fontsize: '18px',
        padding: '16px 20px',
        width: '490px',
        height: '60px',
      },
      md: {
        fontsize: '18px',
        fontWeight: 'bold',
        padding: '16px 20px',
        width: '236px',
        height: '60px',
      },
      sm: {
        fontsize: '18px',
        fontWeight: 'medium',
        padding: '16px 20px',
        width: '122px',
        height: '60px',
      },
      // login?
      xs: {
        fontsize: '18px',
        fontWeight: 'medium',
        padding: '16px 20px',
        width: '96px',
        height: '36px',
      },
    },
  },
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

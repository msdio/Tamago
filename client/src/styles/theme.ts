import { extendTheme } from "@chakra-ui/react";

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
    800: '#dc3d00',
    900: '#d23400',
  }, 
};

const theme = extendTheme({
  colors,
});

export default theme;

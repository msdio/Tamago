type ColorProperty = string;
type ColorType = Record<ColorProperty, string>;

const colors: Record<string, ColorType> = {
  primary: {
    dark: '#FF6A3C',
    main: '#FF8A65',
    light: '#FFA68A',
  },
  secondary: {
    light: '#FFFAF8',
  },
  black: {
    dark: '#101010',
    main: '#272727',
    light: '#3F3C3B',
  },
  gray: {
    dark: '#808080',
    main: '#BFBFBF',
    light: '#F5F5F5',
  },
  white: {
    light: '#FFFFFF',
  },
  error: {
    main: '#FF0000',
    sub: '#FF0606',
  },
  background: {
    main: '#FFF6F1',
    white: '#FAFAFA',
    gray: '#C3C3C3',
    slate: '#D9D9D9',
  },
  table: {
    'head': '#FFFAF8',
    'even': '#F8F8F8',
    'head-text': '#3F3C3B',
  },
};

export default colors;

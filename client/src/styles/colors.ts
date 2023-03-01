type ColorProperty = string;
type ColorType = Record<ColorProperty, string>;

const colors: Record<string, ColorType> = {
  primary: {
    main: '#FF8A65',
    white: '#FFFFFF',
    black: '#101010',
    pressed: '#FF6A3C',
  },
  secondary: {
    text: '#808080',
    fill: '#F5F5F5',
    gray: '#C3C3C3',
    disabled: '#BFBFBF',
    navigation: '#272727',
  },
  error: {
    main: '#FF0000',
    sub: '#FF0606',
  },
  background: {
    main: '#FFF6F1',
    white: '#FAFAFA',
    black: '#3F3C3B',
  },
};
export default colors;

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
  'tamago': {
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
  'tamago-gray': {
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
};
export default colors;

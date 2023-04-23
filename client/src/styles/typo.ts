export const FONT_WEIGHT = {
  EXTRA_BOLD: 800,
  BOLD: 'bold',
  SEMI_BOLD: 600,
  NORMAL: 'normal',
  REGULAR: 400,
};

type TextStylesType =
  | 'button/medium'
  | 'button/bold'
  | 'button/regular'
  | 'text/hd1x'
  | 'text/hd2'
  | 'text/hd3'
  | 'text/hd4'
  | 'text/Text'
  | 'text/medium'
  | 'text/subtitle'
  | 'text/regular'
  | 'text/small'
  | 'navigation/medium'
  | 'text/hover'
  | 'point/hd1'
  | 'point/hd2'
  | 'point/hd3'
  | 'point/hd4';

const textStyles: Record<
  TextStylesType,
  {
    fontFamily?: string;
    fontSize: string;
    fontWeight: number | string;
    lineHeight: string;
  }
> = {
  'button/medium': {
    fontSize: '18px',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '100%',
  },
  'button/bold': {
    fontSize: '18px',
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: '100%',
  },
  'button/regular': {
    fontSize: '14px',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '160%',
  },
  'text/hd1x': {
    fontSize: '30px',
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: '160%',
  },
  'text/hd2': {
    fontSize: '28px',
    fontWeight: FONT_WEIGHT.SEMI_BOLD,
    lineHeight: '160%',
  },
  'text/hd3': {
    fontSize: '25px',
    fontWeight: FONT_WEIGHT.SEMI_BOLD,
    lineHeight: '160%',
  },
  'text/hd4': {
    fontSize: '19px',
    fontWeight: FONT_WEIGHT.SEMI_BOLD,
    lineHeight: '160%',
  },
  'text/Text': {
    fontSize: '18px',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '160%',
  },
  'text/medium': {
    fontSize: '16px',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '160%',
  },
  'text/subtitle': {
    fontSize: '15px',
    fontWeight: FONT_WEIGHT.SEMI_BOLD,
    lineHeight: 'auto',
  },
  'text/regular': {
    fontSize: '15px',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '160%',
  },
  'text/small': {
    fontSize: '15px',
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: '100%',
  },
  'navigation/medium': {
    fontSize: '17px',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: 'auto',
  },
  'text/hover': {
    fontSize: '17px',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: 'auto',
  },
  'point/hd1': {
    fontFamily: 'GangwonEduPower',
    fontSize: '94px',
    fontWeight: FONT_WEIGHT.EXTRA_BOLD,
    lineHeight: '160%',
  },
  'point/hd2': {
    fontFamily: 'GangwonEduPower',
    fontSize: '26px',
    fontWeight: FONT_WEIGHT.EXTRA_BOLD,
    lineHeight: 'auto',
  },
  'point/hd3': {
    fontFamily: 'GangwonEduPower',
    fontSize: '20px',
    fontWeight: FONT_WEIGHT.EXTRA_BOLD,
    lineHeight: 'auto',
  },
  'point/hd4': {
    fontFamily: 'GangwonEduPower',
    fontSize: '15px',
    fontWeight: FONT_WEIGHT.EXTRA_BOLD,
    lineHeight: 'auto',
  },
};

export type TextStyles = typeof textStyles;

export default textStyles;

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

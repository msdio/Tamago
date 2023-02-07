import { Flex, Input, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { DEFAULT_INPUT_THEME, FontBorderTheme } from '../../constants/theme';

interface InputProps {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  w?: string;
  h?: string;
  placeholder?: string;
  errorMessage?: string;
  regex: RegExp;
  theme: FontBorderTheme;
}

export default function InputForm({
  value,
  onChange,
  type,
  w,
  h,
  placeholder,
  regex,
  errorMessage,
  theme,
}: InputProps) {
  const isError = value !== '' && !regex.test(value);

  return (
    <Flex direction='column'>
      <Input
        type={type}
        w={w}
        h={h}
        placeholder={placeholder}
        fontFamily={theme.fontFamily}
        fontSize={theme.fontSize}
        fontWeight={theme.fontWeight}
        border={theme.border}
        borderColor={isError ? '#FF8A65' : theme.borderColor}
        borderRadius={theme.borderRadius}
        value={value}
        onChange={onChange}
        variant='unstyled'
        p='24px 21px 24px 21px'
      />
      {errorMessage && isError ? (
        <Text fontSize={theme.fontSize} fontWeight={theme.fontWeight} color='#FF0000' mt='17'>
          {errorMessage}
        </Text>
      ) : null}
    </Flex>
  );
}

InputForm.defaultProps = {
  w: 'full',
  h: '59px',
  regex: /./,
  theme: DEFAULT_INPUT_THEME,
};

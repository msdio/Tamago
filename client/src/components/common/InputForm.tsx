import { Flex, Input, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { DEFAULT_INPUT_THEME, FontBorderTheme } from '../../styles/theme';

interface InputProps {
  value: string;
  name: string;
  type?: string;
  theme?: FontBorderTheme;
  regex?: RegExp;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  w?: string;
  h?: string;
  placeholder?: string;
  errorMessage?: string;
}

export default function InputForm({
  value,
  type,
  name,
  onChange,
  regex = /./,
  theme = DEFAULT_INPUT_THEME,
  w = 'full',
  h = '59px',
  placeholder,
  errorMessage,
}: InputProps) {
  const isError = value !== '' && !regex.test(value);

  return (
    <Flex direction='column'>
      <Input
        name={name}
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
        p='24px 21px'
      />
      {errorMessage && isError ? (
        <Text fontSize={theme.fontSize} fontWeight={theme.fontWeight} color='#FF0000' mt='17'>
          {errorMessage}
        </Text>
      ) : null}
    </Flex>
  );
}

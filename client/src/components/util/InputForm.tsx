import { Flex, Input, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  w?: string;
  h?: string;
  placeholder?: string;
  errorMessage?: string;
  regex: RegExp;
  border: string;
  borderColor: string;
  borderRadius: string;
  fontSize: string;
  fontWeight: string;
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
  border,
  borderColor,
  borderRadius,
  fontSize,
  fontWeight,
}: InputProps) {
  const isError = value !== '' && !regex.test(value);

  return (
    <Flex direction='column'>
      <Input
        type={type}
        w={w}
        h={h}
        placeholder={placeholder}
        border={border}
        borderColor={isError ? '#FF8A65' : borderColor}
        borderRadius={borderRadius}
        fontSize={fontSize}
        fontWeight={fontWeight}
        value={value}
        onChange={onChange}
        variant='unstyled'
        p='24px 21px 24px 21px'
      />
      {errorMessage && isError ? (
        <Text fontSize={fontSize} fontWeight={fontWeight} color='#FF0000' mt='17'>
          {errorMessage}
        </Text>
      ) : null}
    </Flex>
  );
}

InputForm.defaultProps = {
  regex: /./,
  border: '0.6px solid',
  borderColor: '#BFBFBF',
  borderRadius: '5px',
  fontSize: '15px',
  fontWeight: '400',
};

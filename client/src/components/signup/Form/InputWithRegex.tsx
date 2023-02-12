import { Flex, Input, Text } from '@chakra-ui/react';
import type { ChangeEventHandler } from 'react';

interface InputProps {
  value: string;
  name: string;
  size: string;
  regex: RegExp;
  errorMessage: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export default function InputWithRegex({
  value,
  name,
  size,
  regex,
  errorMessage,
  type,
  onChange,
  placeholder,
}: InputProps) {
  const isError = value !== '' && !regex.test(value);

  return (
    <Flex direction='column'>
      <Input name={name} type={type} size={size} placeholder={placeholder} value={value} onChange={onChange} />
      {isError ? (
        <Text color='#FF0000' mt='17'>
          {errorMessage}
        </Text>
      ) : null}
    </Flex>
  );
}

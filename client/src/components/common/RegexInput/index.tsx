import { Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import type { ChangeEventHandler } from 'react';

interface RegexInputProps {
  value: string;
  name: string;
  size: string;
  isValid?: boolean;
  regex?: RegExp;
  label?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  errorMessage?: string;
}

export default function RegexInput({
  value,
  name,
  size,
  isValid = true,
  errorMessage,
  label,
  type,
  onChange,
  placeholder,
}: RegexInputProps) {
  return (
    <Flex direction='column' gap='8px'>
      {label && (
        <FormLabel fontSize='15px' fontWeight='700'>
          {label}
        </FormLabel>
      )}
      <Flex direction='column'>
        <Input name={name} type={type} size={size} placeholder={placeholder} defaultValue={value} onChange={onChange} />
        {errorMessage && value !== '' && !isValid ? (
          <Text color='#FF0000' mt='17'>
            {errorMessage}
          </Text>
        ) : null}
      </Flex>
    </Flex>
  );
}

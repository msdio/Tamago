import { Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import type { ChangeEventHandler, ForwardedRef } from 'react';
import { forwardRef } from 'react';

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

function RegexInput(
  { value, name, size, isValid = true, errorMessage, label, type, onChange, placeholder }: RegexInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <Flex direction='column' gap='8px'>
      {label && (
        <FormLabel fontSize='15px' fontWeight='700'>
          {label}
        </FormLabel>
      )}
      <Flex direction='column'>
        <Input
          name={name}
          type={type}
          size={size}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          ref={ref}
        />
        {errorMessage && value !== '' && !isValid ? (
          <Text color='#FF0000' mt='17'>
            {errorMessage}
          </Text>
        ) : null}
      </Flex>
    </Flex>
  );
}

const ForwardRefRegexInput = forwardRef<HTMLInputElement, RegexInputProps>(RegexInput);

export default ForwardRefRegexInput;

import { Button, Flex, Input, Text } from '@chakra-ui/react';
import type { ChangeEventHandler, MouseEventHandler } from 'react';

interface InputProps {
  value: string;
  name: string;
  size: string;
  errorMessage: string;
  type?: string;
  regex?: RegExp;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  placeholder?: string;
  buttonText?: string;
}

export default function InputWithButton({
  value,
  name,
  size,
  errorMessage,
  type,
  regex = /./,
  onChange,
  onClick,
  placeholder,
  buttonText,
}: InputProps) {
  const isMatch = regex.test(value);
  const isError = value !== '' && !isMatch;

  return (
    <Flex gap='14px'>
      <Flex direction='column'>
        <Input name={name} type={type} size={size} placeholder={placeholder} value={value} onChange={onChange} />
        {isError ? (
          <Text fontSize='15px' color='#FF0000' mt='20px'>
            {errorMessage}
          </Text>
        ) : null}
      </Flex>
      <Button
        size='sm'
        colorScheme={!isMatch ? 'secondary' : 'tamago'}
        variant={!isMatch ? 'outline' : 'base'}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Flex>
  );
}

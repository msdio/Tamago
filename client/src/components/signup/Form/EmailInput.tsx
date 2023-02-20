import { Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import type { ChangeEventHandler, MouseEventHandler } from 'react';

interface EmailButtonProps {
  value: string;
  name: string;
  size: string;
  isValid?: boolean;
  label?: string;
  errorMessage?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  placeholder?: string;
  buttonText?: string;
}

export default function EmailButton({
  value,
  name,
  size,
  isValid = true,
  label,
  errorMessage,
  type,
  onChange,
  onClick,
  placeholder,
  buttonText,
}: EmailButtonProps) {
  return (
    <Flex direction='column' gap='8px'>
      <FormLabel fontSize='15px' fontWeight='700'>
        {label}
      </FormLabel>
      <Flex gap='14px'>
        <Flex direction='column'>
          <Input
            name={name}
            type={type}
            size={size}
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
          />
          {errorMessage && value !== '' && !isValid ? (
            <Text fontSize='15px' color='#FF0000' mt='20px'>
              {errorMessage}
            </Text>
          ) : null}
        </Flex>
        <Button
          size='sm'
          colorScheme={isValid ? 'tamago' : 'tamago-gray'}
          variant={isValid ? 'base' : 'outline'}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Flex>
    </Flex>
  );
}

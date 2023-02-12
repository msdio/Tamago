import type { UseCheckboxProps } from '@chakra-ui/react';
import { Flex, FormLabel, Icon, Text } from '@chakra-ui/react';
import { useCheckbox } from '@chakra-ui/react';

const CheckedIcon = () => {
  return (
    <Icon viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.87988 4.72785L4.54312 7.40381L10.1193 1.80103'
        stroke='#FF8A65'
        strokeWidth='2.10572'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  );
};

export const CustomCheckbox = (props: UseCheckboxProps) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props);
  return (
    <FormLabel
      display='flex'
      alignItems='center'
      borderColor='secondary.100'
      gap='14px'
      cursor='pointer'
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems='center'
        justifyContent='center'
        bg='white'
        border='0.6px solid'
        borderColor='tamago.500'
        borderRadius='5px'
        w='20px'
        h='20px'
        {...getCheckboxProps()}
      >
        {state.isChecked && <CheckedIcon />}
      </Flex>
      <Text size='15px' {...getLabelProps()}>
        custom checkbox
      </Text>
    </FormLabel>
  );
};

import type { UseCheckboxProps } from '@chakra-ui/react';
import { Flex, FormLabel, Icon, Text } from '@chakra-ui/react';
import { useCheckbox } from '@chakra-ui/react';

const CheckedIcon = () => {
  return (
    <Icon viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg' w='12px'>
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

interface CheckboxProps {
  labelText?: string;
}

export const CustomCheckbox = (props: UseCheckboxProps & CheckboxProps) => {
  const { labelText } = props;
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props);
  return (
    <FormLabel
      display='flex'
      alignItems='center'
      borderColor='tamago-gray.100'
      gap={labelText ? '14px' : '0'}
      cursor='pointer'
      m={0}
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems='center'
        justifyContent='center'
        bg='white'
        border='0.6px solid'
        borderColor='tamago.400'
        borderRadius='5px'
        w='20px'
        h='20px'
        mx='5px'
        my='6px'
        {...getCheckboxProps()}
      >
        {state.isChecked && <CheckedIcon />}
      </Flex>
      <Text size='15px' {...getLabelProps()}>
        {labelText}
      </Text>
    </FormLabel>
  );
};

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function LoginEmailForm() {
  return (
    <FormControl>
      <FormLabel fontSize='15px' fontWeight={700}>
        이메일
      </FormLabel>
      <Input
        type='email'
        placeholder='이메일 주소를 입력해 주세요.'
        border={'.6px solid #BFBFBF'}
        focusBorderColor='tamago.500'
        h='59px'
      />
    </FormControl>
  );
}
export default LoginEmailForm;

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function LoginEmailForm() {
  return (
    <FormControl>
      <FormLabel fontSize='15px' fontWeight={700}>
        이메일
      </FormLabel>
      <Input type='email' placeholder='이메일 주소를 입력해 주세요.' size='lg' />
    </FormControl>
  );
}
export default LoginEmailForm;

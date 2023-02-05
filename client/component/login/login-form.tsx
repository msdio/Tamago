import { Input, Flex, Checkbox, Button, Text, FormControl, FormLabel } from '@chakra-ui/react';
import Image from 'next/image';

function LoginForm() {
  return (
    <>
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
      <FormControl>
        <FormLabel fontSize='15px' fontWeight={700}>
          비밀번호
        </FormLabel>
        <Input
          type='password'
          placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          border={'.6px solid #BFBFBF'}
          colorScheme='tamago'
          focusBorderColor='tamago.500'
          h='59px'
        />
      </FormControl>
      <Flex justifyContent='space-between'>
        <Checkbox defaultChecked colorScheme='tamago'>
          아이디 저장
        </Checkbox>
        <Flex color='#808080' gap='13px' fontSize='15px'>
          <Text>아이디 찾기</Text>
          <Text>|</Text>
          <Text>비밀번호 찾기</Text>
        </Flex>
      </Flex>
      <Button colorScheme='tamago' h='59px'>
        로그인
      </Button>
      <Button colorScheme='tamago' variant={'outline'} h='59px'>
        회원가입
      </Button>

      <Flex justifyContent='center' gap={4}>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/image/google-icon.svg' alt='google login' width={40} height={38} />
        </Button>
        <Button bg='fff' border='0.6px solid #BFBFBF' width='59px' height='59px' p={0}>
          <Image src='/image/github-icon.svg' alt='google login' width={40} height={38} />
        </Button>
      </Flex>
    </>
  );
}

export default LoginForm;

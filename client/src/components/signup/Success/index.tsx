import { Button, Flex, Img, Text } from '@chakra-ui/react';

export default function SignupSuccess() {
  return (
    <Flex direction='column' alignItems='center'>
      <Img w='54px' h='54px' mb='21px' src='/images/signup-ok.png' />
      <Text h='33px' fontWeight='600' fontSize='28px' mb='28px'>
        회원가입이 완료되었습니다.
      </Text>
      <Text fontWeight='500' fontSize='16px'>
        회원가입을 완료하였습니다.
      </Text>
      <Text fontWeight='500' fontSize='16px' mb='54px'>
        가입된 이메일로 로그인 해 주세요.
      </Text>
      <Flex gap='18px'>
        <Button>로그인하기</Button>
        <Button variant='outline'>메인 화면으로 가기</Button>
      </Flex>
    </Flex>
  );
}

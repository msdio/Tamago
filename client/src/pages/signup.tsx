import { Box, Center, Container, Divider, Heading, Input, VStack } from '@chakra-ui/react';

export default function SignupPage() {
  return (
    <Box as='main'>
      <VStack h='1000px' w='487px' margin='0 auto 0 auto'>
        <Heading fontSize='22px' fontWeight='600' fontFamily='Pretender'>
          회원가입
        </Heading>
        <Divider />
        <Input placeholder='이메일'></Input>
        <Input placeholder='비밀번호'></Input>
        <Input placeholder='비밀번호 확인'></Input>
        <Input placeholder='닉네임'></Input>
      </VStack>
    </Box>
  );
}

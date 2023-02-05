import { Box, Center, Container, Divider, Heading, Input, VStack } from '@chakra-ui/react';

export default function SignupPage() {
  return (
    <Box as='main'>
      <VStack w='487px' m='80px auto 80px auto'>
        <Heading fontSize='22px' fontWeight='600' fontFamily='Pretender'>
          회원가입
        </Heading>
        <Divider />
        <Input placeholder='이메일'></Input>
      </VStack>
    </Box>
  );
}

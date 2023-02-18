import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

import AuthLayout from '@/components/common/AuthLayout';
import CheckCircle from '@/icons/CheckCircle';

export default function PasswordChangeComplete() {
  return (
    <AuthLayout title=''>
      <Box textAlign='center'>
        <Flex justifyContent='center'>
          <CheckCircle />
        </Flex>
        <Heading fontSize='28px' my='27px'>
          비밀번호 변경이 완료되었습니다.
        </Heading>
        <Text>비밀번호 변경을 완료하였습니다.</Text>
        <Text>가입된 이메일로 로그인 해 주세요.</Text>
        <Flex mt='54px' gap={5}>
          <Link href='/login'>
            <Button>로그인하기</Button>
          </Link>
          <Link href='/'>
            <Button variant={'outline'}>메인 화면으로 가기</Button>
          </Link>
        </Flex>
      </Box>
    </AuthLayout>
  );
}

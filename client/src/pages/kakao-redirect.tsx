import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { setCookie } from '@/utils/cookie';

export default function KakaoRedirect() {
  const router = useRouter();

  const kakaoToken = router.query.token as string;

  if (kakaoToken) {
    setCookie({ key: 'KAKAOSESSIONID', value: kakaoToken, expiration: 60 });
    router.push('/');
  }

  return (
    <Flex>
      <Text textStyle={'text/hd2'}>카카오 로그인 중입니다...</Text>
    </Flex>
  );
}

import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function KakaoRedirect() {
  const router = useRouter();

  const kakaoToken = router.query.token as string;
  const userId = router.query.userId as unknown as number;

  useEffect(() => {
    window.localStorage.setItem('accessToken', kakaoToken);
  }, [userId, kakaoToken]);

  if (kakaoToken) {
    router.push('/');
  }

  return (
    <Flex>
      <Text textStyle={'text/hd2'}>카카오 로그인 중입니다...</Text>
    </Flex>
  );
}

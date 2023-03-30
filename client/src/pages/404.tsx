import { Button, ButtonGroup, Container, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Header from '@/components/header';

export default function PageNotFound() {
  const router = useRouter();

  return (
    <Flex w='100vw' h='100vh' position='relative' flexDir='column'>
      <Header />
      <Container
        maxW='container.md'
        flexGrow='1'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDir='column'
      >
        <Image src='/images/page-404.png' alt='404' w={'222px'} margin={'51px 0'} />
        <Text fontSize={28} fontWeight={600} marginBottom='22px'>
          죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
        </Text>
        <Text fontSize={18} fontWeight={500}>
          존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경 및 삭제되어 찾을 수 없습니다.
        </Text>
        <Text fontSize={18} fontWeight={500} marginBottom='62px'>
          궁금한 점이 있으시면 asdaf@naver.com로 문의해 주시기 바랍니다.
        </Text>

        <ButtonGroup display='flex' gap='16px'>
          <Link href={'/'}>
            <Button colorScheme='primary' size='md'>
              메인화면으로
            </Button>
          </Link>
          <Button
            colorScheme='primary'
            variant='outline'
            color='primary.main'
            bgColor='white.light'
            size='md'
            onClick={() => {
              router.back();
            }}
          >
            이전 페이지로
          </Button>
        </ButtonGroup>
      </Container>
    </Flex>
  );
}

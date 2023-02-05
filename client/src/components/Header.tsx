import { HStack, Flex, Heading, Text, Button } from '@chakra-ui/react';
import Fonts from '../../public/fonts/GangwonEduPower';

export function Header() {
  return (
    <>
      <Fonts />
      <Flex direction='row' h='88px' borderBottom='0.6px solid #BFBFBF' p='0 120px 0 120px' minW='1100px'>
        <Heading fontSize='26px' lineHeight='88px' fontFamily='GangwonEduPower' letterSpacing='.05em'>
          Tamago
        </Heading>
        <HStack spacing='62px' w='100%' marginLeft='81px' fontSize='17px' fontWeight='700'>
          <Text>긴글연습</Text>
          <Text>짧은글연습</Text>
          <Text>글등록</Text>
          <Text>프로필</Text>
        </HStack>
        <HStack spacing='12.91px' fontSize='14px' lineHeight='17px'>
          <Button w='95.54px' h='35.29px' border='0.516456px solid #BFBFBF' borderRadius='4.3038px' bg='white'>
            <Text>회원가입</Text>
          </Button>
          <Button w='95.54px' h='35.29px' border='0.516456px solid #BFBFBF' borderRadius='4.3038px' bg='white'>
            <Text>로그인</Text>
          </Button>
        </HStack>
      </Flex>
    </>
  );
}

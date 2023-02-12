import { Box, Button, Checkbox, Divider, Flex, Img, Text } from '@chakra-ui/react';

export default function SignupTos() {
  return (
    <Flex direction='column' w='full' gap='26px'>
      <Box w='full'>
        <Checkbox fontSize='15px' fontWeight='700'>
          모두 동의합니다.
        </Checkbox>
      </Box>
      <Divider borderColor='#BFBFBF' />
      <Box w='full'>
        <Checkbox fontSize='15px'>[필수] 만 14세 이상입니다.</Checkbox>
      </Box>
      <Flex w='full' alignItems='center' justify='space-between'>
        <Checkbox fontSize='15px'>[필수] 서비스 이용약관 동의</Checkbox>
        <Img w='5px' h='10px' src='/icons/right_arrow_1.svg' verticalAlign='middle' />
      </Flex>
      <Flex w='full' alignItems='center' justify='space-between'>
        <Checkbox fontSize='15px'>[필수] 개인정보 수집 및 이용 동의</Checkbox>
        <Img w='5px' h='10px' src='/icons/right_arrow_1.svg' />
      </Flex>
      <Flex w='full' alignItems='center' justify='space-between' mb='43px'>
        <Checkbox fontSize='15px'>[선택] 마케팅 수신 동의</Checkbox>
        <Img w='5px' h='10px' src='/icons/right_arrow_1.svg' />
      </Flex>
      <Button type='submit' w='full' h='59px' fontSize='17px' fontWeight='700' bg='#D6D6D6' color='white'>
        동의하고 진행하기
      </Button>
      <Flex gap='14px' justifyContent='center'>
        <Text color='#808080'>이미 가입된 계정이 있으신가요?</Text>
        <Text color='black'>로그인하기</Text>
      </Flex>
    </Flex>
  );
}

import { Box, Button, Text } from '@chakra-ui/react';
import LoginEmailForm from './login-form/login-email-form';

function Guest() {
  return (
    <>
      <Box>
        <Text>게스트 모드에서는 </Text>
        <Text>배지를 얻을 수 없습니다!</Text>
      </Box>
      <Box>
        <Text>로그인을 통해 다양한 통계 정보를 얻어보세요!</Text>
      </Box>
      <hr />
      <Box>
        <LoginEmailForm />

        <Button colorScheme='tamago' mt={6} h='59px' w='full'>
          로그인
        </Button>
      </Box>
    </>
  );
}
export default Guest;

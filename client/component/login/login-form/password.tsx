import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Image from 'next/image';

function LoginPasswordForm() {
  const [show, setShow] = useState(false);

  const handleShowClick = () => {
    console.log('handleShowClick: ');
    setShow(!show);
  };

  return (
    <FormControl>
      <FormLabel fontSize='15px' fontWeight={700}>
        비밀번호
      </FormLabel>
      <InputGroup>
        <Input
          type={show ? 'text' : 'password'}
          placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          border={'.6px solid #BFBFBF'}
          colorScheme='tamago'
          focusBorderColor='tamago.500'
          h='59px'
        />
        <InputRightElement>
          <Box onClick={handleShowClick} h={'5px'} mr='2'>
            {show ? (
              <Image src={'/image/eyeslash.svg'} alt='eyeslash' width={22} height={22} />
            ) : (
              // TODO : eye svg 교체
              <Image src={'/image/eyeslash.svg'} alt='eyeslash' width={22} height={22} />
            )}
          </Box>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
export default LoginPasswordForm;

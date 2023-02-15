import { Box, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

function LoginPasswordForm() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // TODO : error 처리 필요
  const isError = input === 'error';

  const handleShowClick = () => {
    setShow(!show);
  };

  return (
    <FormControl isInvalid={isError}>
      <FormLabel fontSize='15px' fontWeight={700}>
        비밀번호
      </FormLabel>
      <InputGroup>
        <Input
          type={show ? 'text' : 'password'}
          value={input}
          onChange={handleInputChange}
          placeholder='8-12자 영문 + 숫자를 포함하여 입력해 주세요.'
          border={'.6px solid #BFBFBF'}
          colorScheme='tamago'
          focusBorderColor='tamago.500'
          h='59px'
        />
        <InputRightElement>
          <Box onClick={handleShowClick} h={'5px'} mr='2'>
            {show ? (
              <Image src={'/images/eyeslash.svg'} alt='eyeslash' width={22} height={22} />
            ) : (
              // TODO : eye svg 교체
              <Image src={'/images/eyeslash.svg'} alt='eyeslash' width={22} height={22} />
            )}
          </Box>
        </InputRightElement>
      </InputGroup>
      {<FormErrorMessage>8-12자 영문 + 숫자를 포함하여 입력해 주세요.</FormErrorMessage>}
    </FormControl>
  );
}
export default LoginPasswordForm;

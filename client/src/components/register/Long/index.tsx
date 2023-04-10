import { Box, Button, Input, Select, Text, Textarea } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

import { postRegisterLongTextAPI } from '@/apis/typing';
import { ResponseCode } from '@/constants/responseCode';
import type { ApiErrorResponse } from '@/types/apiResponse';

export default function RegisterLong() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const selectRef = useRef<HTMLSelectElement>(null);

  const onTextChange = ({
    e,
    type,
  }: {
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
    type: 'title' | 'content';
  }) => {
    type === 'title' ? setTitle(e.target.value) : setContent(e.target.value);
  };

  const registerLongText = async () => {
    try {
      const data = await postRegisterLongTextAPI({
        title,
        content: content.trim(),
        language: 'ENGLISH',
      });

      if (data.code === ResponseCode.SUCCESS) {
        alert('등록 성공!');
        window.location.replace('/');
      }
    } catch (error) {
      const customError = error as ApiErrorResponse;
      alert(customError.description);
    }
  };

  return (
    <Box
      w={'100vw'}
      h={'calc(100vh-88px)'}
      display='flex'
      flexDir={'column'}
      alignItems={'center'}
      gap='20px'
      mt='20px'
    >
      <Text textStyle={'text/hd3'}>긴 글을 등록할 수 있어요!</Text>
      <Box display={'flex'} gap={'50px'} alignItems='center'>
        <Text textStyle={'text/hd4'}>제목</Text>
        <Input
          w={'50vw'}
          focusBorderColor={'primary.main'}
          value={title}
          onChange={(e) => onTextChange({ e, type: 'title' })}
        />

        <Select ref={selectRef} size={'lg'} w={'20vw'} variant={'outline'} placeholder='글 종류를 선택하세요'>
          <option value='KOREAN'>한글</option>
          <option value='ENGLISH'>영어</option>
          <option value='JAVA'>JAVA</option>
          <option value='JAVASCRIPT'>JAVASCRIPT</option>
          <option value='PYTHON'>PYTHON</option>
        </Select>
      </Box>

      <Textarea
        w={'80vw'}
        h={'40vw'}
        focusBorderColor={'primary.main'}
        resize='none'
        p={'20px'}
        sx={{
          '&::-webkit-scrollbar': {
            w: '2',
          },
          '&::-webkit-scrollbar-track': {
            w: '6',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '10',
            bg: `gray.main`,
          },
        }}
        value={content}
        onChange={(e) => onTextChange({ e, type: 'content' })}
      />
      <Button size={'md'} colorScheme='primary' onClick={registerLongText}>
        등록하기
      </Button>
    </Box>
  );
}

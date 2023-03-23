import { Box, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

import DownArrow from '@/icons/DownArrow';

const MODE_LIST = [
  {
    name: '짧은 글 연습모드',
    link: '/practice/short',
  },
  {
    name: '짧은 글 실전모드',
    link: '/practice/short',
  },
  {
    name: '긴 글 연습모드',
    link: '/practice/long',
  },
  {
    name: '긴 글 실전모드',
    link: '/practice/long',
  },
];

const LinkWrapper = styled(Link)`
  width: 100%;
`;

export default function ModeList() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenToggle = () => setIsOpen((prev) => !prev);

  return (
    <Box w='fit-content' position='relative'>
      <Flex
        mb='21px'
        alignItems='center'
        gap='8.5px'
        border='0.6px solid #000000'
        bg='#BCF075'
        w='fit-content'
        p='10px 23px'
        borderRadius={30}
        h='38px'
        onClick={onOpenToggle}
        cursor='pointer'
      >
        <Text fontSize='18px' fontWeight={500}>
          짧은 글 연습모드
        </Text>

        <DownArrow />
      </Flex>
      {isOpen && (
        <Flex
          alignItems='center'
          overflow='hidden'
          bg='#BCF075'
          w='100%'
          borderRadius={20}
          flexDirection='column'
          border='0.6px solid #000000'
          position='absolute'
          zIndex={1}
          top='46px'
        >
          {MODE_LIST.map(({ name, link }, idx) => (
            <LinkWrapper key={name} href={link}>
              <Flex
                alignItems='center'
                bg='#BCF075'
                w='100%'
                h='47px'
                borderTop={idx === 0 ? '' : '0.6px solid #000000'}
                p='10px 23px'
              >
                <Text fontSize='16px' fontWeight={500} color='#101010'>
                  {name}
                </Text>
              </Flex>
            </LinkWrapper>
          ))}
        </Flex>
      )}
    </Box>
  );
}

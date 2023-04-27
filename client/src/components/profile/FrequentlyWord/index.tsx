import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';

import THeadRow from '@/components/profile/table/THeadRow';

const TestData = [
  {
    word: 'C',
    count: 100,
    transition: 3,
  },
  {
    word: 'D',
    count: 100,
    transition: -3,
  },
  {
    word: 'K',
    count: 100,
    transition: 3,
  },
  {
    word: 'p',
    count: 100,
    transition: 3,
  },
];

export default function FrequentlyWord() {
  return (
    <>
      <Flex padding='16px 5px' alignItems='center' justifyContent='space-between'>
        <Text as='h2' textStyle='text/hd4'>
          자주틀리는 단어
        </Text>

        <Text textStyle='text/medium' colorScheme='white' color='gray.dark' h='26px' w='fit-content' cursor='pointer'>
          전체보기
        </Text>
      </Flex>
      <Box
        border='0.6px solid'
        borderColor='gray.main'
        bg='white.light'
        borderRadius='10px'
        padding='21px 28px'
        h='353px'
      >
        <TableContainer>
          <Table>
            <Thead color='gray.dark'>
              <Tr>
                <THeadRow>순위</THeadRow>
                <THeadRow w='300px'>단어</THeadRow>
                <THeadRow>횟수</THeadRow>
                <THeadRow>변화</THeadRow>
              </Tr>
            </Thead>
            <Tbody>
              {TestData.map((data, idx) => (
                <Tr key={idx} color='black.dark' textStyle='text/regular'>
                  <Td>{idx + 1}</Td>
                  <Td>{data.word}</Td>
                  <Td>{data.count}</Td>
                  <Td color={data.transition > 0 ? '#4E74D3' : '#FF774B'}>
                    {data.transition > 0 ? '+' : ''}
                    {data.transition}번
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

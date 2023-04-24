import { Box, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';

import Pagination from '@/components/profile/Table/Pagination';
import THeadRow from '@/components/profile/Table/THeadRow';

const TestData = [
  {
    id: 1,
    mode: '긴글 실전',
    title: '메밀꽃 필 무렵',
    score: 100,
    upScore: 23,
    ratio: 10.08,
    date: '2021-08-01',
  },
  {
    id: 2,
    mode: '긴글 실전',
    title: '메밀꽃 필 무렵',
    score: 100,
    upScore: 23,
    ratio: 10.08,
    date: '2021-08-01',
  },
  {
    id: 3,
    mode: '긴글 실전',
    title: '메밀꽃 필 무렵',
    score: 100,
    upScore: 23,
    ratio: 10.08,
    date: '2021-08-01',
  },
];

export default function BattleField() {
  const [currentPage, setCurrentPage] = useState(1);
  // TODO : API 연결 필요

  return (
    <Box
      gap='28.29px'
      padding='30px'
      border='0.6px solid'
      borderColor='gray.main'
      bg='white.light'
      borderRadius='10px'
      h='100%'
      justifyContent='space-between'
    >
      <Box>
        <Text as='h2' textStyle='text/hd4' marginBottom='14px'>
          전적
        </Text>
        <TableContainer>
          <Table>
            <Thead color='gray.dark'>
              <Tr>
                <THeadRow>모드</THeadRow>
                <THeadRow w='300px'>제목</THeadRow>
                <THeadRow>점수</THeadRow>
                <THeadRow>비율</THeadRow>
                <THeadRow>날짜</THeadRow>
              </Tr>
            </Thead>
            <Tbody>
              {TestData.map((data) => (
                <Tr key={data.id}>
                  <Td>{data.mode}</Td>
                  <Td>{data.title}</Td>
                  <Td>{data.score}</Td>
                  <Td>{data.ratio}</Td>
                  <Td>{data.date}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination totalPage={4} currentPage={currentPage} onClick={(nextPage) => setCurrentPage(nextPage)} />
    </Box>
  );
}

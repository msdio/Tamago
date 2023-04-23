import { Box, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';

import Pagination from '@/components/profile/table/Pagination';
import THeadRow from '@/components/profile/table/THeadRow';

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
  return (
    <Box
      gap='28.29px'
      padding='30px'
      border='0.6px solid'
      borderColor='gray/main'
      bg='white/light'
      borderRadius='10px'
      w='875px'
    >
      <Text as='h2' textStyle='text/hd4'>
        전적
      </Text>
      <TableContainer>
        <Table>
          <Thead color='gray.dark'>
            <Tr>
              <THeadRow>모드</THeadRow>
              <THeadRow minW='300px'>제목</THeadRow>
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
      <Pagination totalPage={4} currentPage={1} />
    </Box>
  );
}

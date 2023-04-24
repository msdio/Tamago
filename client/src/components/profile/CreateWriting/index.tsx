import { Box, Center, Flex, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';

import Pagination from '@/components/profile/Table/Pagination';
import THeadRow from '@/components/profile/Table/THeadRow';
import DeleteIcon from '@/icons/Delete';
import EditIcon from '@/icons/Edit';

const TestData = [
  {
    id: 1,
    title: '메밀꽃 필 무렵',
    writingType: '긴글',
    language: '한국어',
    pageCount: 10,
  },
  {
    id: 2,
    title: '메밀꽃 필 무렵',
    writingType: '긴글',
    language: '한국어',
    pageCount: 10,
  },
  {
    id: 3,
    title: '메밀꽃 필 무렵',
    writingType: '긴글',
    language: '한국어',
    pageCount: 10,
  },
];

export default function CreateWriting() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Flex
      flexDirection='column'
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
          작성한 글
        </Text>
        <TableContainer>
          <Table>
            <Thead color='gray.dark'>
              <Tr>
                <THeadRow>번호</THeadRow>
                <THeadRow w='240px'>제목</THeadRow>
                <THeadRow>분류</THeadRow>
                <THeadRow>종류</THeadRow>
                <THeadRow>페이지 수</THeadRow>
                <THeadRow w='80px'></THeadRow>
              </Tr>
            </Thead>
            <Tbody>
              {TestData.map((data) => (
                <Tr key={data.id} textStyle='text/regular'>
                  <Td>{data.id}</Td>
                  <Td>{data.title}</Td>
                  <Td>{data.writingType}</Td>
                  <Td>{data.language}</Td>
                  <Td>{data.pageCount}쪽</Td>
                  <Td display='flex' gap='13px' w='fit-content'>
                    {/* NOTE : IconButton을 더 일반적이게 만든다거나? */}
                    <Center w='22px' h='22px' bg='#DAFBDC' borderRadius='4.4px'>
                      <EditIcon />
                    </Center>
                    <Center w='22px' h='22px' bg='#FFE9E9' borderRadius='4.4px'>
                      <DeleteIcon />
                    </Center>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination totalPage={4} currentPage={currentPage} onClick={(nextPage) => setCurrentPage(nextPage)} />
    </Flex>
  );
}

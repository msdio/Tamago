import { Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

import THeadRow from '@/components/profile/table/THeadRow';

interface ProfileListProps {
  title: string;
}

export default function ProfileList({ title }: ProfileListProps) {
  return (
    <Box
      gap='28.29px'
      padding='30px'
      border='0.6px solid'
      borderColor='gray/main'
      w='fit-content'
      bg='white/light'
      borderRadius='10px'
    >
      <Text as='h2' textStyle='text/hd4'>
        {title}
      </Text>
      <TableContainer>
        <Table>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead color='gray.dark'>
            <Tr>
              <THeadRow>모드</THeadRow>
              <THeadRow>모드</THeadRow>
              <THeadRow>모드</THeadRow>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}

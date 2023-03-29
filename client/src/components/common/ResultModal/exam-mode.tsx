import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

import IconButton from '@/components/common/IconButton';
import InfoList from '@/components/common/ResultModal/InfoList';
import type { TypingResultType } from '@/components/common/ResultModal/types';
import { Tier } from '@/components/common/Tier';
import { BookmarkOff } from '@/icons/Heart';
import Share from '@/icons/Share';

interface ResultModalProps {
  isOpen: boolean;
  onReplay: () => void;

  tier: number; // TODO : modal 에서 tier을 계산할지 고민
  result: TypingResultType;
}

export default function ExamResultModal({ onReplay, isOpen, result }: ResultModalProps) {
  const onBookmark = () => {
    console.log('click Bookmark: ');
  };

  const onShare = () => {
    console.log('click Share: ', onShare);
  };

  return (
    <Modal isOpen={isOpen} onClose={onReplay} size='2xl'>
      <ModalOverlay />
      <ModalContent m='auto' p='49px 58px 42px' width='636px'>
        <ModalHeader p={0}>
          <Flex justifyContent='space-between'>
            <Text fontSize='30px' fontWeight={700}>
              짧은 글 연습모드 결과
            </Text>
            <Flex gap='14px'>
              <IconButton onAction={onShare} icon={<Share />} />
              <IconButton onAction={onBookmark} icon={<BookmarkOff />} />
            </Flex>
          </Flex>
          <Text color='gray.dark' fontSize='14px' fontWeight={500}>
            2023.03.20 13:23
          </Text>
        </ModalHeader>

        <ModalBody mt='32px' mb='53px' p={0}>
          <Flex gap='65px'>
            {/* TODO : tier 마다 크기가 다름 */}
            <Box w={190} fontFamily='GangwonEduPower' textAlign='center'>
              <Box position='relative' w='190px'>
                <Box zIndex={1} position='relative' w='180px' top='20px' m='auto'>
                  <Tier level={5} />
                </Box>
                <Box
                  top={0}
                  bg='background.main'
                  borderRadius='50%'
                  w='190px'
                  h='190px'
                  position='absolute'
                  zIndex={0}
                />
              </Box>
              <Text fontSize='20px' fontWeight={400} mt='20px'>
                Lv.5
              </Text>
              <Text fontSize='19px' fontWeight={600} mt='8px'>
                위풍당당한 닭
              </Text>
            </Box>
            <Box w='264px'>
              <Text fontSize='19px' fontWeight={600} color='black.dark' mb='14px'>
                메밀꽃 필 무렵
              </Text>
              <InfoList {...result} />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent='center' p='0' gap='17px'>
          <Button w='174px' onClick={onReplay}>
            다시 하기
          </Button>
          <Link href='/'>
            <Button w='174px' variant='outline'>
              메인화면으로 가기
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

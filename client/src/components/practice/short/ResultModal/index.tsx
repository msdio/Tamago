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
import { Tier } from '@/components/common/Tier';
import { BookmarkOff } from '@/icons/Heart';
import Share from '@/icons/Share';

interface ResultModalProps {
  isOpen: boolean;
  onReplay: () => void;
}

export default function ResultModal({ onReplay, isOpen }: ResultModalProps) {
  const onBookmark = () => {};
  const onShare = () => {};

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

        <ModalBody mt='32px' mb='53px'>
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

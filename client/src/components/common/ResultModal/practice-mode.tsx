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
import { useRouter } from 'next/router';

import IconButton from '@/components/common/IconButton';
import InfoList from '@/components/common/ResultModal/InfoList';
import type { TypingResultType } from '@/components/common/ResultModal/types';
import { BookmarkOff } from '@/icons/Heart';
import Share from '@/icons/Share';
import { getDateYYYYMMDDHHMMFormat } from '@/utils/time';

interface ResultModalProps {
  isOpen: boolean;
  result: TypingResultType;
  onClose: () => void;
  endTime: Date;

  title?: string;
}

export default function PracticeResultModal({ onClose, title, isOpen, result, endTime }: ResultModalProps) {
  const router = useRouter();
  const isLong = !!title;

  const onBookmark = () => {
    console.log('click Bookmark: ');
  };

  const onShare = () => {
    console.log('click Share: ', onShare);
  };

  const onReplay = () => {
    onClose();
    router.reload();
  };

  return (
    // TODO : Modal border radius 수정
    <Modal isOpen={isOpen} onClose={onReplay} size='md'>
      <ModalOverlay />
      <ModalContent m='auto' p='49px 40px 42px'>
        <ModalHeader p={0}>
          <Flex justifyContent='space-between'>
            <Text fontSize='30px' fontWeight={700}>
              {isLong ? '긴 글' : '짧은 글'} 연습모드 결과
            </Text>
            <Flex gap='14px'>
              <IconButton onAction={onShare} icon={<Share />} />
              <IconButton onAction={onBookmark} icon={<BookmarkOff />} />
            </Flex>
          </Flex>
          <Text color='gray.dark' fontSize='14px' fontWeight={500}>
            {getDateYYYYMMDDHHMMFormat(endTime)}
          </Text>
        </ModalHeader>

        <ModalBody mt='32px' mb='53px' p={0}>
          <Flex gap='65px' w='100%'>
            <Box w='100%'>
              {title && (
                <Text fontSize='19px' fontWeight={600} color='black.dark' mb='14px'>
                  {title}
                </Text>
              )}

              <InfoList {...result} />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent='center' p='0' gap='17px'>
          <Button w='174px' onClick={onReplay}>
            이어 하기
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

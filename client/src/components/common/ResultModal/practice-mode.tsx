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
import PrepareAlert from '@/components/common/PrepareAlert';
import InfoList from '@/components/common/ResultModal/InfoList';
import useToggle from '@/hooks/useToggle';
import { BookmarkOff } from '@/icons/Heart';
import type { TypingResultType } from '@/types/typing';
import { getDateYYYYMMDDHHMMFormat } from '@/utils/time';

interface ResultModalProps {
  isOpen: boolean;
  result: TypingResultType;
  endTime: Date;
  onReplay: () => void;

  title?: string;
  nextURL?: string;
}

export default function PracticeResultModal({ title, isOpen, result, endTime, onReplay }: ResultModalProps) {
  const [isPrepareModalOpen, togglePrepareModal] = useToggle();

  const isLong = !!title;

  const onBookmark = () => {
    togglePrepareModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onReplay} size='md'>
        <ModalOverlay />
        <ModalContent m='auto' p='49px 40px 42px'>
          <ModalHeader p={0}>
            <Flex justifyContent='space-between'>
              <Text fontSize='30px' fontWeight={700}>
                {isLong ? '긴 글' : '짧은 글'} 연습모드 결과
              </Text>
              <Flex gap='14px'>
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
      <PrepareAlert isOpen={isPrepareModalOpen} onClose={togglePrepareModal} />
    </>
  );
}

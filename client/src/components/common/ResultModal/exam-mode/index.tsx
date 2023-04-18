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
import { useState } from 'react';

import IconButton from '@/components/common/IconButton';
import PrepareAlert from '@/components/common/PrepareAlert';
import ScoreInfo from '@/components/common/ResultModal/exam-mode/ScoreInfo';
import InfoList from '@/components/common/ResultModal/InfoList';
import useToggle from '@/hooks/useToggle';
import { BookmarkOff } from '@/icons/Heart';
import type { TypingResultType } from '@/types/typing';
import { getDateYYYYMMDDHHMMFormat } from '@/utils/time';

interface ResultModalProps {
  isOpen: boolean;
  result: TypingResultType;
  endTime: Date;
  onAction: () => void;
  actionLabel: string;

  isLoading: boolean;
  mode: 'short' | 'long';
}

export default function ExamResultModal({
  isOpen,
  result,
  endTime,
  onAction,
  actionLabel,
  mode,
  isLoading,
}: ResultModalProps) {
  // TODO : score을 밖에서 가져오도록 구현 필요
  const [isPrepareModalOpen, togglePrepareModal] = useToggle();

  const onBookmark = () => {
    togglePrepareModal();
  };

  const [prevScore, setPrevScore] = useState<number | null>(null);
  const [afterScore, setAfterScore] = useState<number | null>(null);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onAction} size='2xl'>
        <ModalOverlay />
        <ModalContent m='auto' p='49px 58px 42px' width='636px'>
          <ModalHeader p={0}>
            <Flex justifyContent='space-between'>
              <Text fontSize='30px' fontWeight={700}>
                {mode === 'long' ? '긴 글' : '짧은 글'} 실전모드 결과
              </Text>
              <Flex gap='14px'>
                <IconButton onAction={onBookmark} icon={<BookmarkOff />} />
              </Flex>
            </Flex>
            <Text color='gray.dark' fontSize='14px' fontWeight={500}>
              {getDateYYYYMMDDHHMMFormat(endTime)}
            </Text>
          </ModalHeader>

          <ModalBody mt='32px' mb='50px' p={0}>
            <Flex gap='65px'>
              <ScoreInfo isLoading={isLoading} afterScore={afterScore} prevScore={prevScore} />
              <Box w='264px' pt='32px'>
                <InfoList {...result} />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent='center' p='0' gap='17px'>
            <Button w='174px' onClick={onAction}>
              {actionLabel}
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

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
import { useEffect, useState } from 'react';

import { getTierInfoAPI } from '@/apis/typing';
import IconButton from '@/components/common/IconButton';
import PrepareAlert from '@/components/common/PrepareAlert';
import InfoList from '@/components/common/ResultModal/InfoList';
import { Tier } from '@/components/common/Tier';
import { TIER_INFO } from '@/constants/tierInfo';
import useToggle from '@/hooks/useToggle';
import { BookmarkOff } from '@/icons/Heart';
import type { TierLevels } from '@/types/tier';
import type { TypingResultType } from '@/types/typing';
import { getDateYYYYMMDDHHMMFormat } from '@/utils/time';

interface ResultModalProps {
  isOpen: boolean;
  result: TypingResultType;
  endTime: Date;
  onAction: () => void;
  actionLabel: string;

  mode: 'short' | 'long';
}

export default function ExamResultModal({ isOpen, result, endTime, onAction, actionLabel, mode }: ResultModalProps) {
  const [isPrepareModalOpen, togglePrepareModal] = useToggle();
  const [isLoading, toggleLoading] = useToggle();
  const onBookmark = () => {
    togglePrepareModal();
  };

  const [tier, setTier] = useState<TierLevels | null>(null);
  const [score, setScore] = useState<number>(0);

  const tierInfo = tier ? TIER_INFO[tier] : null;

  const settingTierInfo = async () => {
    toggleLoading();
    const { tier, score } = await getTierInfoAPI();
    toggleLoading();

    setTier(tier);
    setScore(score);
  };

  useEffect(() => {
    settingTierInfo();
  }, []);

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
              {/* TODO : tier 마다 크기가 다름 */}
              {tierInfo ? (
                <Box w={190} fontFamily='GangwonEduPower' textAlign='center'>
                  <Box position='relative' w='190px'>
                    <Tier level={tierInfo.level} />
                  </Box>
                  {/* GangwonEduPower 적용이 안될까요.. */}
                  <Text fontSize='20px' fontWeight={400} mt='9px' fontFamily='GangwonEduPower'>
                    {tierInfo.text}
                  </Text>
                  <Text fontSize='16px' fontWeight={500}>
                    {tierInfo.label}
                  </Text>
                  <Text mt='13px' fontSize='26px' fontWeight={400} fontFamily='GangwonEduPower'>
                    {score}
                  </Text>
                </Box>
              ) : (
                <Box w={190} fontFamily='GangwonEduPower' textAlign='center'>
                  loading...
                </Box>
              )}
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

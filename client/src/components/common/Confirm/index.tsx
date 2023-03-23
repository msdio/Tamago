import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react';

interface ConfirmProps {
  header: string;
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;

  subHeader?: string;
  actionLabel?: string;
  closeLabel?: string;
}

export default function Confirm({
  header,
  subHeader,
  isOpen,
  onClose,
  onAction,
  actionLabel,
  closeLabel,
}: ConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m='auto' p='32px' w='432px'>
        <ModalBody>
          <Flex direction='column' alignItems='center' justify='center'>
            <Box textAlign='center' mt='13px' mb='34px'>
              <Text fontWeight='700' lineHeight='160%' p='0px 54px' wordBreak='keep-all'>
                {header}
              </Text>
              {subHeader && <Text mt='11px'>{subHeader}</Text>}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent='center' p='0' gap='17px'>
          <Button onClick={onClose}>{closeLabel ?? '취소'}</Button>
          <Button
            onClick={() => {
              onAction();
              onClose();
            }}
            variant='outline'
          >
            {actionLabel ?? '확인'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

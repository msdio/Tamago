import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
export default function Alert({ children, isOpen, onClose }: AlertProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m='auto' p='32px' w='432px'>
          <ModalBody>
            <Flex direction='column' alignItems='center' justify='center'>
              {children}
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent='center' p='0'>
            <Button onClick={onClose}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

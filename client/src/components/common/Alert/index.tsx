import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react';
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
        <ModalContent m='auto' p='33px'>
          <ModalBody textAlign='center' mt='20px' mb='10px'>
            {children}
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button onClick={onClose}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

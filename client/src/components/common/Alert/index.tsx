import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react';

interface AlertProps {
  header: string;
  isOpen: boolean;
  onClose: () => void;
  subHeader?: string;
}

export default function Alert({ header, subHeader, isOpen, onClose }: AlertProps) {
  return (
    <>
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
          <ModalFooter justifyContent='center' p='0'>
            <Button onClick={onClose}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

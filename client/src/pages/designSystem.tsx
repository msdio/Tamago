import { Button, Flex, Heading, VStack } from '@chakra-ui/react';

function designSystem() {
  return (
    <VStack>
      <Flex flexDirection='column' gap={4} p={4}>
        <Button size='lg'>Default _ lg</Button>
        <Button size='lg' isDisabled>
          Disabled _ lg
        </Button>
        <Button size='md'>Default _ md </Button>
        <Button size='md' variant='outline'>
          Line _ md
        </Button>

        <Button size='sm' colorScheme='secondary'>
          Check _ sm{' '}
        </Button>
        <Button size='xs' colorScheme='secondary'>
          log in{' '}
        </Button>
      </Flex>
    </VStack>
  );
}
export default designSystem;

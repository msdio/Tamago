import { Button, Flex, Input, VStack } from '@chakra-ui/react';

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

        <Button size='sm' colorScheme='tamago-gray' variant='outline'>
          Check _ sm
        </Button>

        {/* NOTE: header이외에 login은 계속 쓰인다면 theme에 추가 
        -> color schema값이 없으면 똑같이 동작, white, black을 넣어도 마찬가지*/}
        <Button size='xs' colorScheme='' variant='outline'>
          log in
        </Button>

        <Input size='lg' placeholder='Default _ Lg' />

        <Input size='lg' defaultValue='Focus _ Lg' />

        <Input size='lg' defaultValue='Text Input _ Lg' />

        <Input size='lg' defaultValue='Disabled _ Lg' isDisabled />

        <Input size='md' placeholder='Default _ Md' />

        <Input size='md' defaultValue='Focus _ Md' />

        <Input size='md' defaultValue='Text Input _ Md' />
      </Flex>
    </VStack>
  );
}
export default designSystem;

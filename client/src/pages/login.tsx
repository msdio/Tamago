import Image from 'next/image';
import { Box, Button, Checkbox, Flex, Grid, GridItem, Heading, Input, Text, VStack } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <div>
      <header>header</header>
      <Grid templateColumns='1fr 1fr' h='calc(100vh - 100px)' alignItems='center' gap='100px' p='150px'>
        <Flex flexDirection='column'>
          <Heading fontSize='6xl' as='h1'>
            TAMAGO
          </Heading>
          <Text size='4xl' mt='2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim venis
          </Text>
          <Box>
            <Button size='lg' mt='12'>
              <Flex justifyContent='space-between' w='200px'>
                <Text>Go</Text>
                {/* <div> -></div> */}
                <Image src={'/image/arrow-right.png'} width={15} height={15} alt={''} />
              </Flex>
            </Button>
          </Box>
        </Flex>
        <Flex flexDirection='column' gap={4}>
          <Heading as='h2' size='md'>
            Login
          </Heading>
          <Input type='email' name='email' id='email' placeholder='E-mail' />
          <Input type='password' name='password' id='password' placeholder='Password' />
          <Flex justifyContent='space-between'>
            <Checkbox>Remember</Checkbox>
            <Text>Forgot Password</Text>
          </Flex>
          <Button bg={'#BABABA'}>Sign in</Button>
          <Button bg='#fff'>Sign up</Button>

          <Flex justifyContent='center' gap={4}>
            <Button></Button>
            <Button></Button>
          </Flex>
        </Flex>
      </Grid>
    </div>
  );
}

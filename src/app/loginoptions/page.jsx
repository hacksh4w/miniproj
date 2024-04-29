import { Stack, Flex, Container, Box, Heading, Center } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

//login options page

export default function loginoptions() {
  return (
    <Container maxW='100vw' bg='white' >
      <Flex  minH='100vh' maxW='95%' direction='column' justify="center" align="center" mx={8}>
        <Stack spacing={12} color='grey' direction='column' align='center' orderWidth='1px' borderColor='blue'>
          <Link href="/login">
            <Button colorScheme='orange' variant='solid' size='lg' fontWeight={600}>
              Sign in for Customers
            </Button>
            </Link>
            <Link href="/shoplogin">
            <Button colorScheme='teal' variant='solid' size='lg'  fontWeight={600}>
              Sign in for Shops & Shop Owners
            </Button>
            </Link>
            <Link href="/adminlogin">
            <Button colorScheme='teal' variant='solid' size='lg'fontWeight={500}>
              Sign in for Admin
            </Button>
           </Link>
        </Stack>
      </Container>

    </Box>
  );
}

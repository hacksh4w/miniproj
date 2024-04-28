"use client";
import { Stack, Flex, Container } from "@chakra-ui/react"
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link';

export default function loginoptions() {
  return (
    <Container maxW='100vw' bg='white' >
      <Flex  minH='100vh' maxW='95%' direction='column' justify="center" align="center" mx={8}>
        <Stack spacing={8} direction='column' align='center'>
        <Link href="/login">
          <Button colorScheme='teal' variant='solid' size='lg' fontWeight={500}>
              Sign in for Customers
            </Button>
            </Link>
            <Link href="/shoplogin">
            <Button colorScheme='teal' variant='solid' size='lg'  fontWeight={500}>
              Sign in for Shops & Shop Owners
            </Button>
            </Link>
            <Link href="/adminlogin">
            <Button colorScheme='teal' variant='solid' size='lg'fontWeight={500}>
              Sign in for Admin
            </Button>
            </Link>
        </Stack>
      </Flex>
    </Container>
  );
}

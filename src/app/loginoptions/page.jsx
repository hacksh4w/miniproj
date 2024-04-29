import { Stack, Flex, Container, Box, Heading, Center } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

//login options page

export default function loginoptions() {
  return (
    <Box
      bgGradient="linear(to-br,rgb(1111,11,111), rgb(1000,100,1))"
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Add box shadow to the container
    >
      <Container maxW='container.md'>
        <Center>
          <Heading as="h1" size="2xl" mt={0} mb={8} color="black" fontFamily="Pacifico">
            REGISTER/LOGIN
          </Heading>
        </Center>
        <Stack spacing={8} direction='column' align='center' justify="center">
          <Flex direction="row" justify="center">
            <Box p={4} bg="black" borderRadius="40" margin={4} padding={50} boxShadow="20px 4px 10px rgba(0, 0, 0, 0.5)"> {/* Add box shadow and adjust margin */}
              <Link href="/login">
                <Button colorScheme='blue' borderRadius="40" variant='solid' size='lg' fontWeight={500}>
                  Customer
                </Button>
              </Link>
            </Box>
            <Box p={4} bg="black" borderRadius="500" margin={4} padding={50} boxShadow="20px 0px 20px rgba(0, 0, 0, 0.5)"> {/* Add box shadow and adjust margin */}
              <Link href="/shoplogin">
                <Button colorScheme='blue' borderRadius="40" variant='solid' size='lg'  fontWeight={500}>
                  Shops & Shop Owners
                </Button>
              </Link>
            </Box>
            <Box p={4} bg="black" borderRadius="40" margin={4} padding={50} boxShadow="20px 4px 10px rgba(0, 0, 0, 0.5)"> {/* Add box shadow and adjust margin */}
              <Link href="/adminlogin">
                <Button colorScheme='blue' borderRadius="40" variant='solid' size='lg' fontWeight={500}>
                   Admin
                </Button>
              </Link>
            </Box>
          </Flex>
        </Stack>
      </Container>

    </Box>
  );
}

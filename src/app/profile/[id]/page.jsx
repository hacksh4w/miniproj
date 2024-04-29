"use client";
import {Container, Box, Flex, Heading, Button, Spacer, Center} from "@chakra-ui/react";
import {supabase} from "../../../utils/supabase";

const page = () => {
  return (
    <Center h="100vh">
      <Container
        maxW="90vw"
        bg="white"
        border="2px"
        borderColor="orange"
        borderRadius="md"
        p="4"
      >
        <Flex
          direction={["column", "row"]}
          gap={["2", "10"]}
          alignItems="flex-start"
          pt={2}
        >
          <Box p="2">
            <Heading size="lg">Profile Information</Heading>
            <Box mt="4" gap="2">
              <p>Name: </p>
              <p>Role: </p>
              <p>Email: </p>
              <p>Phone Number: </p>
              <p>Address: </p>
            </Box>
          </Box>
          <Spacer />
          <Button colorScheme="orange" variant="outline" size="sm" mt={[4, 0]}>
            Edit Details
          </Button>
        </Flex>
      </Container>
    </Center>
  );
};
export default page;

"use client"
import { useState, useEffect } from "react";
import { Center, Container, Box, Flex, Heading, Button, Spacer, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { supabase } from "../../../utils/supabase";

const page = ({ params }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: items, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", params.id);

        if (error) {
          throw error;
        }

        setUserDetails(items[0]);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, [params.id]);

  const handleChange = (newValue, fieldName) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: newValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .update(userDetails)
        .eq("id", params.id);

      if (error) {
        throw error;
      }

      console.log("Profile updated successfully:", data);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <Center h="100vh">
      <Container maxW="90vw" bg="white" border="2px" borderColor="orange" borderRadius="md" p="4">
        <Flex direction={["column", "row"]} gap={["2", "10"]} alignItems="flex-start" pt={2}>
          <Box p="2">
            <Heading size="lg">Profile Information</Heading>
            <Box mt="4" gap="2">
              <Editable defaultValue={userDetails.name || `${userDetails.name}`} onChange={(newValue) => handleChange(newValue, "name")}>
                <EditablePreview />
                <EditableInput />
              </Editable>
              <p>{userDetails.role}</p>
              <p>{userDetails.email}</p>
              <Editable defaultValue={userDetails.number || `${userDetails.number}`} onChange={(newValue) => handleChange(newValue, "number")}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Box>
          </Box>
          <Spacer />
          <Button colorScheme="orange" variant="outline" size="sm" mt={[4, 0]} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Flex>
      </Container>
    </Center>
  );
};

export default page;

"use client";
import { Navbar } from "../../../components";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Tag
} from "@chakra-ui/react";
import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";

const shop = ({ params }) => {
  const [itemDetails, setItemDetails] = useState([]);
    const [shopDetails, setShopDetails] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          throw error;
        }
        setItemDetails(data);
      } catch (error) {
        console.error("Error fetching shop data:", error.message);
      }
    };

    const fetchShop = async () => {
        try {
          const { data, error } = await supabase
            .from("shops")
            .select("*")
            .eq("id", itemDetails.shop_id)
            .single();
  
          if (error) {
            throw error;
          }
          setShopDetails(data);
        } catch (error) {
          console.error("Error fetching shop data:", error.message);
        }
      };

    fetchDetails();
    fetchShop();
  }, [params.id]);

  return (
    <>
      <Navbar />
      <Container
        maxW="full"
        px={{ base: "6", sm: "16" }}
        py={{ base: "4", sm: "16", lg: "16" }}
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-t, yellow.400, orange.400)"
      >
        {itemDetails && (
          <Flex
            minW="80%"
            bg="white"
            rounded="lg"
            boxShadow="xl"
            p="5"
            flexDir={{ base: "column", md: "row", lg: "row" }}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box flex="row" w="1/3">
              <Image
                src={itemDetails.imageUrl}
                alt="Product Image"
                boxSize={{ base: "250px", md: "300px" }}
                objectFit="contain"
                rounded="lg"
              />
            </Box>
            <Box flex="row" gap={{ base: "0", md: "20" }}>
              <Heading as="h2" size="lg" mb="2">
                {itemDetails.name}
              </Heading>
              <Tag colorScheme="yellow" mr="10px">{itemDetails.category}</Tag>
              <Tag colorScheme="yellow">{itemDetails.type}</Tag>
              <Box>
                <p>Available At: {shopDetails.name}</p>
                <p>Price: {itemDetails.price}</p>
                <p>Location: {shopDetails.latitude}, {shopDetails.longitude}</p>
              </Box>
            </Box>
          </Flex>
        )}

      </Container>
    </>
  );
};

export default shop;

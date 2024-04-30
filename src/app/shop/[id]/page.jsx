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
  Tag,
} from "@chakra-ui/react";
import Link from 'next/link'
import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";

const shop = ({ params }) => {
  const [shopData, setShopData] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const { data, error } = await supabase
          .from("shops")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) {
          throw error;
        }
        setShopData(data);
      } catch (error) {
        console.error("Error fetching shop data:", error.message);
      }
    };

    const fetchItems = async () => {
      try {
        const { data: items, error } = await supabase
          .from("items")
          .select("*")
          .eq("shop_id", params.id);

        if (error) {
          throw error;
        }

        setItems(items);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchShopData();
    fetchItems();
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
        {shopData && (
          <Flex
            minW="80%"
            bg="white"
            rounded="lg"
            boxShadow="xl"
            p="5"
            flexDir={{ base: "column", md: "row", lg: "row" }}
            alignItems="center"
            justifyContent="space-around"
          >
            <Box flex="row" w="1/3">
              <Image
                src={shopData.shopimg}
                alt="Shop Image"
                boxSize={{ base: "200px", md: "300px" }}
                objectFit="contain"
                rounded="lg"
              />
            </Box>
            <Box flex="row" gap={{ base: "0", md: "20" }}>
              <Heading as="h2" size="lg" mb="2">
                {shopData.name}
              </Heading>
              <Box>
                <p>Rating: {shopData.shoprate}/5</p>
                <p>{shopData.address}</p>
                <p>
                  {shopData.city}, {shopData.state}
                </p>
                <p>{shopData.pincode}</p>
                <p>
                  Location: {shopData.latitude}, {shopData.longitude}
                </p>
                <p>Owned By: {shopData.owner_name}</p>
                <p>Phone: {shopData.sphone}</p>
              </Box>
            </Box>
          </Flex>
        )}

        <br />
        <Heading size={{ base: "sm", md: "md" }} mb="10px">
          Available Products
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="8">
          {items.map((item, index) => (
            <Link key={item.id} href={`/item/${item.id}`}>
              
                <Box
                  key={index}
                  p="4"
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="white"
                >
                  <Image
                    src={item.imageUrl}
                    alt="Product Image"
                    boxSize={{ base: "250px", md: "300px" }}
                    objectFit="cover"
                    rounded="lg"
                  />
                  <br />
                  <Text fontWeight="bold">{item.name}</Text>
                  <Tag colorScheme="yellow">{item.category}</Tag>

                  <Text>{item.description}</Text>
                  <p>Rating: {item.rating}/5</p>
                  <Text>Price: Rs. {item.price}</Text>
                </Box>
              
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default shop;

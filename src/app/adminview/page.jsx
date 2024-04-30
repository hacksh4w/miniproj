"use client";
import { Navbar } from "../../components";
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
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import admin from '../../public/admin.jpg'

const shop = ({ params }) => {
  const [shopData, setShopData] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("role", "admin")
          .single();

        if (error) {
          throw error;
        }
        setADminData(data);
      } catch (error) {
        console.error("Error fetching shop data:", error.message);
      }
    };

    const fetchItems = async () => {
      try {
        const { data: items, error } = await supabase
          .from("shops")
          .select("*")
          .eq("id", params.id);

        if (error) {
          throw error;
        }

        setItems(items);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };
    fetchShopData();
    fetchAminData();
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
        {adminData && (
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
                src='../../../public/admin.jpg'
                alt="Shop Image"
                boxSize={{ base: "200px", md: "300px" }}
                objectFit="contain"
                rounded="lg"
              />
            </Box>
            <Box flex="row" gap={{ base: "0", md: "20" }}>
              <Heading as="h2" size="lg" mb="2">
                {adminData.name}
              </Heading>
              <Box>
                <p>
                  {adminData.city}, {adminData.state}
                </p>
                <p>{adminData.pincode}</p>
                <p> Email: {adminData.email}</p>
                <p> Phone: {adminData.number}</p>
              </Box>
            </Box>
          </Flex>
        )}

        <br />
        <Heading size={{ base: "sm", md: "md" }} mb="10px">
          All Shops
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="8">
          {shopData.map((item, index) => (
            <Link key={item.id} href={`/item/${item.id}`}>
              <Box
                key={index}
                p="4"
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
              >
                <Image
                  src={item.shopimg}
                  alt="Shop Image"
                  boxSize={{ base: "250px", md: "300px" }}
                  objectFit="cover"
                  rounded="lg"
                />
                <br />

                <p>Rating: {item.shoprate}/5</p>
                <p>{item.address}</p>
                <p>
                  {item.city}, {item.state}
                </p>
                <p>{item.pincode}</p>
                <p>
                  Location: {item.latitude}, {item.longitude}
                </p>
                <p>Owned By: {item.owner_name}</p>
                <p>Phone: {item.sphone}</p>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default shop;
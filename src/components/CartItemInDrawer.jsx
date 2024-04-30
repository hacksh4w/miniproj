'use client' 

import { Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import { useShoppingCart } from "use-shopping-cart";

const CartItemInDrawer = ({ item }) => {
  const { removeItem } = useShoppingCart();

  return (
    <Box maxW="72" border="1px solid #eee" p="3" my="3">
      <Image
        src={item.image}
        alt={item.title}
        width={200}
        height={200}
        objectFit="contain"
      />
      <Text fontSize="xs" bg="blue.100" w="max" my="2" px="1" py="0.5">
        {item.category}
      </Text>
      <Text fontSize="md" fontWeight="semibold" noOfLines={1}>
        {item.title}
      </Text>
      <Text fontSize="xl" fontWeight="bold">
        $ {item.price}
      </Text>
      <Button
        w="full"
        mt="2"
        colorScheme="red"
        onClick={() => removeItem(item.id)}
      >
        Remove Product
      </Button>
    </Box>
  );
};

export default CartItemInDrawer;

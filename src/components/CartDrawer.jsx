'use client' 

import { useEffect, useState } from "react";
import { Grid, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button, useToast } from "@chakra-ui/react";
import { supabase } from "../utils/supabase"; 
import CartItemInDrawer from "./CartItemInDrawer"; 
//import { useUser } from "../contexts/UserContext";
import { useProfile } from "../contexts/ProfileContext";

function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();
    const { cartUser } = useProfile();
  useEffect(() => {
    fetchCartItems(); // Fetch cart items whenever the drawer opens
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      // Fetch cart items from Supabase
      const { data, error } = await supabase
        .from("cartItems")
        .select("*")
        .eq("user_id", cartUser.id());
      if (error) throw error;
      setCartItems(data);
      toast({
        title: "Success",
        description: "Fetch cart items.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      // Calculate total price
      const sum = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const tax = sum * 0.03;
      setTotalPrice(sum + tax);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      toast({
        title: "Error",
        description: "Failed to fetch cart items.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart</DrawerHeader>

        <DrawerBody>
          {cartItems.length > 0 ? (
            <Grid templateColumns="repeat(2, 1fr)">
              {cartItems.map((item) => (
                <CartItemInDrawer key={item.id} item={item} />
              ))}
            </Grid>
          ) : (
            <p>No items in the cart</p>
          )}
        </DrawerBody>
        
        <DrawerFooter>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <Button colorScheme="teal">Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;


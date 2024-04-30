'use client'
import React from "react";
import { useRef, useState, useEffect} from "react";
import { BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";
//import DrawerComponent from "./Drawer";
import { Box, Button, useDisclosure, useToast } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { supabase } from "@/utils/supabase";
import { useProfile } from "@/contexts/ProfileContext";

const HeaderMain = () => {
  const toast = useToast({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerRef = useRef();
  const { profileData } = useProfile();

  const [cartItems,setCartItems]= useState([])
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);  

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when the drawer opens
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      // Fetch cart items from Supabase
     // const { data : { userID } } = await supabase.auth.getUser();
      //console.log(userID.id)
      const { data, error } = await supabase.from("cartItems").select('*')
      //.eq('user_id', profileData.id);
      if (error) throw error;
      
      setCartItems(data);
      console.log(cartItems)
      // Calculate total price
      const sum = data.reduce((acc, item) => acc + item.cost * item.quantity, 0);
      const tax = sum * 0.03;
      setTotalPrice(sum + tax);
      console.log(sum)
      console.log(tax)
      console.log(totalPrice)
      if (cartItems.length > 0) {
      toast({
        title: "Success",
        description: "Items fetched",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      } else { 
        toast({
          title: "NIL",
          description: "Empty Cart",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } 
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
    <div className="border-b border-orange-300 py-6">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
          <Link href="#">Ensamble Haven</Link>
        </div>

        <div className="w-full sm:w-[300px] md:w-[70%] relative">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Enter any product name..."
          />

          <BsSearch className="absolute right-0 top-0 mr-3 mt-3 text-gray-400" size={20}/>
        </div>

        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
        <Link href="/addprofile"><Button > 
            <BiUser /> <p>Add</p>
           
          </Button> </Link>
        <Link href="/profile/3"><Button > 
            <BiUser /> <p>View</p>
           
          </Button> </Link>

          <div className="hidden lg:flex gap-5 text-gray-500 text-[20px]">
          <Link href="/">
          <p>Logout</p>
          </Link>

        
          </div>

        </div>
      
      </div>
        
    </div>
  );
};

export default HeaderMain;
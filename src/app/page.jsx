"use client";
import styles from "./page.module.css";
import  { Box, useColorMode } from "@chakra-ui/react";
import { useMyContext } from "../contexts/ContextApi";
import Navbar from "../components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";

export default function Home() {
  const {palette} = useMyContext();
  useColorMode();
  return (
    // <ChakraProvider theme={theme}>
    <Box bg={palette.background} sx={{
      minHeight:'200vh'
    }}>
     <Navbar/>
    </Box>
  // </ChakraProvider>
  );
}

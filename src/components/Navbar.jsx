"use client";

import { useMyContext } from "../contexts/ContextApi";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import useNavbar from "../hooks/useNavbar";

const Navbar = () => {
  const { palette } = useMyContext();
  const [scroll, scrollp] = useNavbar();
  const Navlinks = [
    { name: "Rent/Buy", link: "/order" },
    { name: "Services", link: "/services" },
    { name: "Contact Us", link: "/footer" },
  ];
  return (
    <Box
      sx={{
        backgroundColor: palette.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "75px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        visibility: scroll ? "hidden" : "visible",
        transition: scroll ? "visibility 0.2s, opacity 0.2s linear" : "0.2s",
        opacity: scroll ? "0" : "1",
        position: "fixed",
        top: "0",
      }}
    >
      <Box
        sx={{
          minWidth: "90vw",
          minHeight: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          color={palette.primary}
          fontSize="1.5rem"
          position={"relative"}
          width="200px"
          cursor={'pointer'}
        >
         EnsembleHaven
          <span>
            <Text
              sx={{
                position: "absolute",
                top: "-2px",
                left: "2px",
              }}
              color={palette.text}
              fontSize={"1.5rem"}
            >
            EnsembleHaven
            </Text>
          </span>
        </Text>
        <Box
          sx={{
            display: {base:'none', md:'flex'},
            alignItems: "center",
            justifyContent: "space-between",
            height: "75px",
            width: "400px",
            marginRight:{base:'0', md:'125px'}
          }}
        >
          {Navlinks.map((value, index) => {
            return (
              <Text key={index} cursor={'pointer'} sx={{
                color:palette.text,
                fontSize:'1.1rem',
                '&:hover':{
                  textDecoration:'underline'
                }
              }}>
                {value.name}
              </Text>
            );
          })}
        </Box>
        <Button
          bg={palette.primary}
          sx={{ "&:hover": { bg: palette.tertiary, color:palette.background } }}
          color={palette.text}
        >
          <Text>Sign Up</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
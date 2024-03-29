// theme.js
"use client";

import { extendTheme } from "@chakra-ui/react";

import { StyleConfig } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  colors: {
    dark: {
      primary: "#28ccc1",
      secondary: "#2f6a64",
      tertiary: "#9cbae7",
      background: "#050001",
      text: "#e0e0e0",
    },
    light: {
      primary: "#33d7cc",
      secondary: "#95d0ca",
      tertiary: "#183663",
      background: "#fffafb",
      text: "#1f1f1f",
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts:{
    body:'"Roboto", sans-serif;',
    heading: '"Roboto", sans-serif;',
    default: '"Roboto", sans-serif;'
  }
});

export default theme;

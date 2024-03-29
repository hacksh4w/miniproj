"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useColorMode } from "@chakra-ui/react";
import { ThemeContext } from "@emotion/react";
import { color } from "framer-motion";

export const MyContext = createContext<contextVariables>({
  palette: {
    primary: "#33d7cc",
    secondary: "#95d0ca",
    tertiary: "#183663",
    background: "#fffafb",
    text: "#1f1f1f",
  },
  profile: false,
  setProfile: ()=>{}
});

export const useMyContext = () => useContext(MyContext);

const ContextApi = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [profile, setProfile] = useState<boolean>(false);

  const [palette, setPalette] = useState<colorPalette>({
    primary: "#33d7cc",
    secondary: "#95d0ca",
    tertiary: "#183663",
    background: "#fffafb",
    text: "#1f1f1f",
  });
  useEffect(() => {
    if (colorMode === "light") {
      setPalette({
        primary: "#33d7cc",
        secondary: "#95d0ca",
        tertiary: "#183663",
        background: "#fffafb",
        text: "#1f1f1f",
      });
    } else if (colorMode === "dark") {
      setPalette({
        primary: "#28ccc1",
        secondary: "#2f6a64",
        tertiary: "#9cbae7",
        background: "#050001",
        text: "#e0e0e0",
      });
    }
  }, [colorMode]);
  return (
    <MyContext.Provider value={{ palette, profile, setProfile }}>{children}</MyContext.Provider>
  );
};

export default ContextApi;

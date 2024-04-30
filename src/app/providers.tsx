'use client'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../contexts/UserContext'
import { ProfileProvider } from '../contexts/ProfileContext';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider children={undefined}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
     </ProfileProvider>)
}
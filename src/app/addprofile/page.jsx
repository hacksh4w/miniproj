'use client' 

import React, { useState } from 'react';
import { useToast, Container, Box, Flex, Stack, Input, Button } from '@chakra-ui/react';
import { supabase } from '@/utils/supabase'; // Make sure to import supabase
import {useProfile} from '@/contexts/ProfileContext';

const Page = () => {
    const toast = useToast();
    const { userID } = useProfile();
    const [userData, setUserData] = useState({
        country: '',
        email: '',
        number: '',
        pincode: 0,
        state: '',
        city: '',
    });

    const handleSubmit = async () => {
        try {
           /* if (!userID) {
                throw new Error('User ID is undefined');
            } */
          //  console.log(userID.id)
            console.log(userData)
            // Add additional fields to userData before insertion
            const userDataWithExtraFields = {
                ...userData,
                role: 'client', 
                id: '9', //userID.id(), 
                password : '123t434',
            };

            // Insert userDataWithExtraFields into the 'profile' table
            const { data, error } = await supabase.from('profile').insert([userDataWithExtraFields]).eq('email', userData.email);

            if (error) {
                throw error;
            }

            toast({
                title: 'Profile Updated',
                description: 'Your profile has been updated successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating profile:', error.message);
            toast({
                title: 'Error',
                description: 'Failed to update profile. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e, field) => {
        setUserData({
            ...userData,
            [field]: e.target.value,
        });
    };

    return (
        <Container maxW='100vw' bg='white'>
            <Flex minH='100vh' maxW='85%' direction='column' justify='center' align='center' mx={8} align='center'> 
                <Stack direction='column' justify='center' align='center' w='30%' m={4}>
                    <Input m={3} type='email' placeholder='Email' label='email' onChange={(e) => handleChange(e, 'email')}  size='md' />
                    <Input m={3} type='tel' placeholder='Phone Number' onChange={(e) => handleChange(e, 'number')} />
                    <Input m={3} type='number' placeholder='Pincode' onChange={(e) => handleChange(e, 'pincode')} />
                    <Input m={3} type='text' placeholder='Country' onChange={(e) => handleChange(e, 'country')} />
                    <Input m={3} type='text' placeholder='State' onChange={(e) => handleChange(e, 'state')} />
                    <Input m={3} type='text' placeholder='City' onChange={(e) => handleChange(e, 'city')} />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Flex>
        </Container>
    );
};

export default Page;

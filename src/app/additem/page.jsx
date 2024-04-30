'use client'
import React, { useState } from 'react';
import { useToast, Container, Flex, Stack, Input, Button } from '@chakra-ui/react';
import { supabase } from '@/utils/supabase'; // Make sure to import supabase
import { useProfile } from '@/contexts/ProfileContext';

const AddItemPage = () => {
    const toast = useToast();
    const { userID } = useProfile();
    const [itemData, setItemData] = useState({
        name: '',
        imageUrl: '',
        price: 0,
        rating: 0,
        product_id: '',
        shop_id: 5, // Make sure to get the shop ID of the logged-in shop owner
        category: '',
        brand: '',
        latitude: 0,
        longitude: 0,
        quantity: 0,
        desc: '',
        type: '',
        sales: 0,
    });

    const handleSubmit = async () => {
        try {
            // Add additional fields to itemData before insertion
            const itemDataWithExtraFields = {
                ...itemData,
                shop_id: userID,
                // Assuming the user ID represents the shop owner's ID
            };

            // Insert itemDataWithExtraFields into the 'item' table
            const { data, error } = await supabase.from('items').insert([itemDataWithExtraFields]);

            if (error) {
                throw error;
            }

            toast({
                title: 'Item Added',
                description: 'The item has been added successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding item:', error.message);
            toast({
                title: 'Error',
                description: 'Failed to add item. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleChange = (e, field) => {
        setItemData({
            ...itemData,
            [field]: e.target.value,
        });
    };

    return (
        <Container maxW='100vw' bg='white'>
            <Flex minH='100vh' maxW='85%' direction='column' justify='center' align='center' mx={8} align='center'>
                <Stack direction='column' justify='center' align='center' w='30%' m={4}>
                    <Input m={3} type='text' placeholder='Name' onChange={(e) => handleChange(e, 'name')} size='md' />
                    <Input m={3} type='text' placeholder='Image URL' onChange={(e) => handleChange(e, 'imageUrl')} />
                    <Input m={3} type='number' placeholder='Price' onChange={(e) => handleChange(e, 'price')} />
                    <Input m={3} type='number' placeholder='Rating' onChange={(e) => handleChange(e, 'rating')} />
                    <Input m={3} type='text' placeholder='Product ID' onChange={(e) => handleChange(e, 'product_id')} />
                    <Input m={3} type='text' placeholder='Category' onChange={(e) => handleChange(e, 'category')} />
                    <Input m={3} type='text' placeholder='Brand' onChange={(e) => handleChange(e, 'brand')} />
                    <Input m={3} type='number' placeholder='Quantity' onChange={(e) => handleChange(e, 'quantity')} />
                    <Input m={3} type='text' placeholder='Description' onChange={(e) => handleChange(e, 'desc')} />
                    <Input m={3} type='text' placeholder='Type' onChange={(e) => handleChange(e, 'type')} />
                    <Input m={3} type='number' placeholder='Sales' onChange={(e) => handleChange(e, 'sales')} />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Flex>
        </Container>
    );
};

export default AddItemPage;

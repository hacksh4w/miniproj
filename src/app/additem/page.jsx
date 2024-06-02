'use client';
import React, { useState } from 'react';
import { useToast, Container, Flex, Stack, Input, Button } from '@chakra-ui/react';
import { supabase } from '@/utils/supabase'; // Ensure supabase is correctly imported
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
        shop_id: 5, // This will be overridden by userID
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
            const itemDataWithExtraFields = {
                ...itemData,
                shop_id: userID,
            };

            const { data, error } = await supabase.from('items').insert([itemDataWithExtraFields]);

            if (error) throw error;

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });
    };

    return (
        <Container maxW="100vw" bg="white">
            <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "28px" }}>Add Item</h1>
            <Flex direction="column" justify="center" align="center" mx={8} minH="100vh" maxW="85%">
                <Stack direction="column" justify="center" align="center" w="30%" m={4}>
                    <Input m={3} type="text" name="name" placeholder="Name" onChange={handleChange} size="md" />
                    <Input m={3} type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
                    <Input m={3} type="number" name="price" placeholder="Price" onChange={handleChange} />
                    <Input m={3} type="number" name="rating" placeholder="Rating" onChange={handleChange} />
                    <Input m={3} type="text" name="product_id" placeholder="Product ID" onChange={handleChange} />
                    <Input m={3} type="text" name="category" placeholder="Category" onChange={handleChange} />
                    <Input m={3} type="text" name="brand" placeholder="Brand" onChange={handleChange} />
                    <Input m={3} type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
                    <Input m={3} type="text" name="desc" placeholder="Description" onChange={handleChange} />
                    <Input m={3} type="text" name="type" placeholder="Type" onChange={handleChange} />
                    <Input m={3} type="number" name="sales" placeholder="Sales" onChange={handleChange} />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Flex>
        </Container>
    );
};

export default AddItemPage;

'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useToast } from '@chakra-ui/react';
import { Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useProfile } from '../../contexts/ProfileContext';

const RequestsTable = () => {
  const [cart, setCart] = useState([]);
  const userId = useProfile();
  const toast = useToast({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('cartItems')
          .select('*')
         // .eq('cart', status)
          //.eq('user_id', userId);
        console.log(cart)
        if (error) throw error;
        else {
          setCart(data || []);
          
        }
      } catch (error) {
        toast({
          title: 'Failed to fetch requests',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      }
    };
    fetchRequests();
  }, [userId, toast]);

  const handleOrder = async (requestId) => {
    try {
        const { pdata, perror } = await supabase
        .from('cartItems')
        .select('*')
      const request = cart.find((item) => item.id === requestId);

      if (!request) {
        throw new Error('Request not found in cart');
      }

      const { data, error } = await supabase.from('orders').insert([
        {
         // cproduct_id: request.cproduct_id,
          deliveryname: request.product,
         // sell_price: request.price,
          ///quantity :request.quantity,
          pmethod : 'online',
          status : 'placed',
        },
      ]);
    

      if (error) {
        throw error;
      } else {
        console.log('Order placed successfully:', data);
        // Remove the item from the cart after placing the order
        setCart((prevCart) => prevCart.filter((item) => item.id !== requestId));
        toast({
          title: 'Order Placed',
          description: 'Your order has been placed successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>Cart Item ID</Th>
            <Th>Item Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total Cost</Th>
            <Th>Order Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map((request) => (
            <Tr key={request.id}>
              <Td>{request.id}</Td>
              <Td>{request.product}</Td>
              <Td>{request.cost}</Td>
              <Td>{request.quantity}</Td>
              <Td>{request.totPrice}</Td>
              <Td>{request.status ? 'cart' : 'placed'}</Td>
              <Td>
                {!request.verified ? (
                  <Button onClick={() => handleOrder(request.id)}>
                    Place Order
                  </Button>
                ) : (
                  <Button disabled>Order Placed</Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default RequestsTable;

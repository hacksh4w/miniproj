'use client' 
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Box, Button, Image } from '@chakra-ui/react';
import { supabase } from '../utils/supabase';
import { useProfile } from '../contexts/ProfileContext';
import { useToast } from '@chakra-ui/react';
const ProductCard = ({ img, type, desc, price, rating, title, item }) => {
  const { profileData } = useProfile();
  const toast = useToast();
  const generateRating = (rating) => {
    // Rating generation logic remains the same
  };
/* const handleAddToCart = async () => {
    try {
      console.log(profileData.id, "inside product card");
      console.log(profileData)
      // Check if the item already exists in the cart for the current user
      const { data: existingCartItem, error: existingCartError } = await supabase
        .from('cartItems')
        .select('*')
        .eq('user_id', profileData.id)
        .eq('cproduct_id', item.product_id)
        .single();

      if (existingCartError) {
        throw existingCartError;
      }

      if (existingCartItem) {
        // If the item already exists, update the quantity
        const updatedQuantity = existingCartItem.quantity + 1;

        const { data: updatedCartData, error: updateCartError } = await supabase
          .from('cartItems')
          .update({ quantity: updatedQuantity })
          .eq('cproduct_id', existingCartItem.cproduct_id)
          .single();

        if (updateCartError) {
          throw updateCartError;
        }

        console.log('Item quantity updated in cart:', updatedCartData);
      } else {
        // If the item doesn't exist, insert a new entry
        const { data: newCartItem, error: insertCartError } = await supabase
          .from('cartItems')
          .insert([
            { 
              user_id: profileData.id,
              cproduct_id: item.product_id,
              quantity: item.quantity + 1,
              product: item.name, 
              shop_id: item.shop_id, 
              item_id: item.item_id, 
              cost: item.price, 
              total_price: item.price * quantity 
            }
          ]);

        if (insertCartError) {
          throw insertCartError;
        }
        console.log('Item added to cart:', newCartItem);
      }
    } catch (error) {
    console.error('Error adding item to cart:', error.message);
    };
  }; */
  const handleAddToCart = async () => {
    try {
      console.log(profileData.id, "inside product card");
      // Use upsert to insert or update the cart item
      const { data: cartItem, error: cartError } = await supabase
        .from('cartItems')
        .upsert(
          {
            user_id: profileData.id,
            cproduct_id: item.product_id,
            quantity: item.quantity + 1 | 1,
            product: item.name,
            shop_id: item.shop_id,
            item_id: item.item_id,
            cost: item.price,
            totPrice: item.price
          },
          { onConflict: 'id'} // Define the conflict resolution strategy
        );
        toast({
          title: "Success",
          description: "Item added to cart.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
  
      if (cartError) {
        throw cartError;
      }
  
      console.log('Item added to cart:', cartItem);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add cart items.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Error adding item to cart:', error.message);
    }
  };
  return (
    <div className='px-4 border border-orange-500 rounded-xl max-w-[400]'>
      <Box boxSize='xs' justify='center' align='center'             
        w={200}
        h={300}>
        <Image  
            m={2}
            pt={3}
            objectFit='cover' 
            boxSize='180px'
            key={img} 
            src={img} 
            fallbackSrc='https://via.placeholder.com/150'
            alt='Product Image Card' />
      </Box>    
      <div className='space-y-2 py-2'>
        <h2 className='text-orange-400 uppercase text-center font-bold'>{title}</h2>
        <h2 className='text-orange-400 uppercase text-center font-bold'>{type}</h2>
        <p className='text-gray-500 max-w-[150px]'>{desc}</p>
        {generateRating(rating)}
        <div className='font-bold flex gap-4'>
          Rs. {price}
          <del className='text-red-600'>Rs. {parseInt(price) + 500}</del>
        </div>
          <Button onClick={handleAddToCart} color='blue.600'> 
            Order Now! 
          </Button> 
      </div>
    </div>
  );
}

export default ProductCard;

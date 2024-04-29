import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Box, Image } from '@chakra-ui/react';

const ProductCard = ({ img, type, desc, price, rating, title }) => {
  const generateRating = (rating) => {
    // Rating generation logic remains the same
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
          {/* Action Button Required // depending on rental/sale buy now or rent now shud be action word */}
      </div>
    </div>
  );
};

export default ProductCard;

"use client";
import { useEffect, useState } from "react";
import React from "react";
import {motion} from 'framer-motion'
import {fadeIn } from "../utils/motion";
import { Flex, Button, Image, Box } from '@chakra-ui/react'
import { ArrowBackIcon , ArrowForwardIcon }from '@chakra-ui/icons'
import { BsJustify } from "react-icons/bs";

const Carousel = ({ images, autoSlide = false, autoSlideInterval = 5000 }) => {
    const [curr, setCurr] = useState(0);

    const prev = () => {
        setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
    };

    const next = () => {
        setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
    };

    useEffect(() => {
        if (!autoSlide) return;

        const slideInterval = setInterval(next, autoSlideInterval);

        return () => clearInterval(slideInterval);
    }, []);

    return (
        <motion.div 
            variants={fadeIn('left', 'spring', 1, 1)} initial='hidden' whileInView='show' viewport={{once:false}}
            className="overflow-hidden relative lg:max-w-[580px] max-w-[610px] lg:mt-0 lg:mr-10 mt-[50px] lg:h-[450px] xs:h-auto h-[280px]">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {images.map((img) => (
                    <div key={img} className="flex-shrink-0 w-full justify-center">
                    <Box boxSize='md' justify='center' align='center' >
                        <Image  
                            objectFit='cover' 
                            boxSize='400px'
                            key={img} 
                            mx={4}
                            pl={6}
                            src='https://bit.ly/dan-abramov' 
                            fallbackSrc='https://via.placeholder.com/150'
                            alt='Dan Abramov' />
                    </Box>    
                   {/*} <img
                            key={img}
                            src={img}
                            className="ss:w-[440px] xs:w-[300px] w-[240px] mx-auto"
                /> */}
                    </div>
                ))}
            </div>
            <Flex
                pos="absolute"
                inset={0}
                alignItems="center"
                justifyContent="space-between"
                p={{ base: 4, xs: 0 }}
                m={2}
            >
                <Button onClick={prev}>
                    <ArrowBackIcon w={8} h={8} color="red.500" />
                </Button>

                <Button onClick={next}>
                    <ArrowForwardIcon w={8} h={8} color="red.500" />
                </Button>
            </Flex>
          
          {/*}  <div className="absolute inset-0 flex item-center justify-between xs:p-4 p-0">
                <Button onClick={prev}>
                <ArrowBackIcon  w={8} h={8} color="red.500" />
                </Button>
                <Button onClick={next} justify='center' >
                    <ArrowForwardIcon w={8} h={8} color="red.500" />
                </Button>
            </div> */}

            <div className="absolute bottom-0 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all w-2 h-2 bg-[#ADADAD] rounded-full ${
                                curr === i ? "p-1.5" : "bg-opacity-50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Carousel;

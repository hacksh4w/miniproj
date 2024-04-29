"use client";

import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";
import { TypingText, TitleText, Button } from "../components";
import styles from "../../styles";
import { bestsellers } from "../constants";
import Image from "next/image";
import { supabase } from "../utils/supabase.js"; 

const ShoppingCard = ({ index, img, title, amount, stars}) => {

    const arr = [...Array(stars).keys()];
    const [bestsellers, setBestsellers] = useState([]);
    //key is product id

    // fn to obtain bestseller items from the database
    useEffect(() => {
      const fetchBestsellers = async () => {
        try {
          // Fetch data from the 'items' table in Supabase, top 5 best selling items
          const { data, error } = await supabase.from("items").select("*").order("sales", { ascending: false }).limit(5);
          if (error) {
            throw error;
          }
          setBestsellers(data);
        } catch (error) {
          console.error("Error fetching bestseller items:", error.message);
        }
      };
      fetchBestsellers();
    }, []);
    return (
        <motion.div

            variants={fadeIn("right", "spring", index * 0.15, 0.75)}
            initial="hidden"
            whileInView="show"
            whileHover={{
                scale: 1.05,
                transition: {
                    type: "tween",
                    duration: 0.25,
                    ease: "easeOut",
                },
            }}
            className="flex justify-center items-center border-[2px] border-[#cecece] p-[3px] 
            hover:shadow-lg  rounded-[20px] card-item
          transition-all duration-200 ease-out"
        >
            {/* image */}
            <div className="flex flex-col bg-white rounded-[17px] p-[20px]">
                <div className="relative h-[272px] w-[284px]">
                    <Image
                        src={img}
                        alt="cartImg"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>

                {/* content */}
                <div className="flex flex-col mt-[35px]">
                    {/* title and money */}
                    <div className="flex flex-grow justify-between items-center">
                        <div className="flex flex-col">
                            <h1 className="font-poppins font-bold text-[14px] text-darkBlue">
                                {title}
                            </h1>
                            <p className="flex space-x-[3px] mt-[6px]">
                                {arr.map((_, i) => (
                                    <img key={i} src="/logo.png"
                                     alt="stars" />
                                ))}
                                {/* Display bestsellers
                                {bestsellers.map((_, i) => (
                                    <img key={i} src="/logo.png"
                                     alt="stars" />
                                ))} */}
                            </p>
                        </div>
                        <p className="font-poppins text-[18px] font-bold text-darkBlue">
                            {amount}
                        </p>
                    </div>

                    {/* buttons */}
                    <div className="flex mt-[25px] justify-between items-center">
                        <button
                            className=" font-poppins font-semibold p-[2px]
                      text-darkBlue rounded-[10px] button-gradient"
                        >
                            <div className="w-full h-full bg-white py-[8px] px-[15px] rounded-[8px]">
                                Shop now
                            </div>
                        </button>
                        <a
                            href="go_to_page"
                            className="font-poppins font-normal text-lightBlue"
                        >
                          
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Bestsellers = () => {



    return (
        <section id='featured' className={`${styles.padding} mt-20`}>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                className={`${styles.boxWidth} flex flex-col justify-center items-center`}
            >
                <TypingText title="| Bestsellers" textStyles="text-center" />
                <TitleText
                    title={
                        <>
                            See the most popular
                            <br className="ss:block hidden" /> deals we offer
                        </>
                    }
                    textStyles="text-center"
                />

                <div className="flex lg:gap-x-[70px] gap-x-[50px] gap-y-[50px] flex-wrap justify-center mt-[70px]">
                    {bestsellers.map((item, index) => (
                        <ShoppingCard {...item} index={index} />
                    ))}
                </div>

                <motion.div
                    variants={fadeIn("up", "spring", 0, 1)}
                    className="mt-[45px]"
                >
                    <Button text="More products" styles="" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Bestsellers;

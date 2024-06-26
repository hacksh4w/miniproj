"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";
import styles from "../../styles";
import { TypingText, TitleText } from "../components";
import Image from "next/image";

import { Box } from '@chakra-ui/react' 


const container = (direction, type, duration) => ({
    hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            type,
            duration,
            ease: "easeOut",
            staggerChildren: 0.3,
            delayChildren: 0.5,
        },
    },
});

const item = {
    hidden: {
        x: 0,
        y: 100,
        opacity: 0,
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            ease: "easeOut",
            type: "spring",
        },
    },
};

const Community = () => {
    return (
        <section id="community" className={`${styles.padding} mt-20`}>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                className={`${styles.boxWidth} flex flex-col justify-center`}
            >
                <TypingText title="| Community" textStyles="text-center" />
                <TitleText
                    title={
                        <>
                            Customers from all across
                            <br className="ss:block hidden" /> the Globe
                        </>
                    }   
                    textStyles="text-center"
                />

                <motion.div
                    variants={container("up", "tween", 1)}
                    initial="hidden"
                    whileInView="show"
                    className="relative w-full h-[530px] mt-20 flex"
                >

                {/* 
                        <Image 
                        src="/world1.png"
                        alt="map"
                        fill
                        style={{ objectFit: "cover" }}
                        />
                    */}
                    

                    <motion.div
                        variants={item}
                        className="absolute top-20 right-20  w-[73px] h-[80px] "
                    >
                        <Image
                            src="/mapUser-4.png"
                            alt="people"
                            fill
                            className="w-full h-full"
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="absolute top-1/2 left-[45%] w-[73px] h-[80px] "
                    >
                        <Image
                            src="/mapUser.png"
                            alt="people"
                            fill
                            className="w-full h-full"
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="absolute sm:top-10 xs:top-0 top-5 md:left-20 sm:left-10 left-20 w-[73px] h-[80px] "
                    >
                        <Image
                            src="/mapUser-5.png"
                            alt="people"
                            fill
                            className="w-full h-full"
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="absolute sm:flex hidden md:bottom-20 md:right-20 bottom-[200px] right-0  w-[73px] h-[80px] "
                    >
                        <Image
                            src="/mapUser-2.png"
                            alt="people"
                            fill
                            className="w-full h-full"
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="absolute top-[100px] md:flex hidden right-[500px] w-[73px] h-[80px] "
                    >
                        <Image
                            src="/mapUser-3.png"
                            alt="people"
                            fill
                            className="w-full h-full"
                        />
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="absolute bottom-[150px] sm:flex hidden lg:left-[200px] md:left-[150px] left-[50px] w-[73px] h-[80px] "
                    >
                        <Image
                            src="/mapUser-6.png"
                            alt="people"
                            fill
                            className="w-full h-full"
                        />
                    </motion.div>

            

                    
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Community;

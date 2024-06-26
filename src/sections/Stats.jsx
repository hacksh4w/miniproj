'use client'

import React from "react";
import { stats } from "../constants";
import styles from "../../styles";
import {motion} from 'framer-motion'
import { staggerContainer, fadeIn } from "../utils/motion";

const StatItem = ({ number, title, index }) => {
    return (
        <motion.div 
            variants={fadeIn('up', 'spring', 1 + index * 0.15, 0.75)} 
            className="flex justify-center space-x-[10px] items-center ml-[10px] mt-9">
            <h1 className="font-poppins font-bold sm:text-[50px] ss:text-[46px] text-[42px] text-gradient-1">
                {number}
            </h1>
            <h1 className="font-poppins font-semibold ss:text-[18px] text-[16px] max-w-[100px] text-lightBlue">
                {title}
            </h1>
        </motion.div>
    );
};

const Stats = () => {
    return (
        <motion.section 
            variants={staggerContainer} initial='hidden' whileInView='show' viewport={{once:false}}
            className={` lg:px-0 ${styles.paddingX} relative`}>
            <motion.div 
                variants={fadeIn('up', 'spring', 0.25, 1)}
                className="bg-white xl:max-w-[1280px] mx-auto rounded-[20px] flex justify-center  
                absolute -top-20 sm:right-16 sm:left-16 right-6 left-6 card-shadow">
                <div
                    className="flex justify-around px-20 pb-[34px] flex-wrap 
                    lg:gap-x-[150px] md:gap-x-[100px] sm:gap-x-[50px] gap-x-8"
                >
                    {stats.map((stat, index) => (
                        <StatItem key={stat.id} {...stat} index={index} />
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Stats;

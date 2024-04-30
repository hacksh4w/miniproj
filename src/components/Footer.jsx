'use client';

import styles from '../../styles';
import React from 'react';
import { footerLinks, socialMedia } from '../constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const Footer = () => {
  return (
    <motion.section
      id='support'
      variants={fadeIn('up', 'spring', 0.5, 1)}
      initial='hidden'
      whileInView='show'
      className={`${styles.flexCenter} py-8 mt-8 flex-col bg-gradient px-16`}
    >
      <div className={`${styles.boxWidth} flex flex-col items-center`}>
        <div className='relative h-[30px] w-[130px]'>
          <Image
            src='/logo.png'
            alt='logo'
            width={200} // Set the desired width
            height={200} // Set the desired height
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
        <p className='font-poppins mt-3 text-[16px] text-lightBlue text-center'>
          <br />
          <br />
          <br />
          Your one stop shop for all daily needs.
        </p>
      </div>

      <div className={`${styles.boxWidth} flex justify-center items-center pt-3 border-t-[1px] border-t-lightBlue`}>
        <p className='font-poppins text-darkBlue text-[18px] font-normal text-center leading-[27px]'>
          2024 Ensamble Haven. All Rights Reserved.
        </p>
      </div>
    </motion.section>
  );
};

export default Footer;

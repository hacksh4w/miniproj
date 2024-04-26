import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import HeaderTop from '../../components/HeaderTop';
import HeaderMain from '../../components/HeaderMain';
import Navbar from '../../components/HNavbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shopping Website',
  description: 'Provides different kinds of products',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderTop />
        <HeaderMain />
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

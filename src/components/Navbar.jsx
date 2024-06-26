"use client";
import Link from 'next/link';
import React from "react";
import Image from "next/image";
import { navLinks } from "../constants";
import styles from "../../styles";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import { useRouter } from "next/navigation";

const Navbar = ({ toggleNavBar, menuToggle }) => {

    const router = useRouter()

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`w-full flex justify-between py-6 items-center ${styles.paddingX}`}
        >
            <div
                onClick={() => router.push("/")}
                className="relative w-[100px] flex items-center h-10 cursor-pointer my-auto"
            >
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                    
                    style={{ objectFit: "contain", objectPosition: "left" }}
                />
            </div>


            <ul className="list-none sm:flex hidden items-center justify-end ml-[50px]">
                {navLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`font-poppins font-medium cursor-pointer md:text-[16px] text-[14px] text-darkBlue 
                        hover:underline hover:underline-offset-8 decoration-4 decoration-lightBlue/30 ${
                            index !== navLinks.length - 1
                                ? "lg:mr-20 mr-10"
                                : "mr-0"
                        }`}
                    >
                        <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                ))}
            </ul>

            <div className="sm:flex hidden ml-10 space-x-10 justify-end">
                <button className="font-poppins font-semibold text-[16px] hover:scale-110 transition-transform duration-100 ease-in-out">
                    
                </button>
                <button
                    className="font-poppins text-[16px] font-medium button-gradient
               lg:px-[30px] md:px-[15px] px-[10px] py-[10px] rounded-[10px] text-white 
               hover:scale-110 hover:shadow-lg transition transform duration-100 ease-in-out"
                >
                    <Link href="/loginoptions">Sign In</Link>
                </button>
            </div>

            <div className="sm:hidden z-[5] flex flex-1 justify-end item-center relative">
                <Image
                    src={menuToggle ? "./close.svg" : "./menu.svg"}
                    alt="menu"
                    onClick={() => toggleNavBar((prev) => !prev)}
                    width={28}
                    height={28}
                    className="w-[28px] h-[28px] object-contain"
                />
            </div>
        </motion.nav>
    );
};

export default Navbar;

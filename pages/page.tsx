

import NewProducts from "../components/NewProducts";

import Hero from "../sections/Hero";

import "./globals.css";
import HeaderTop from "../components/HeaderTop";
import HeaderMain from "../components/HeaderMain";
import HNavbar from "../components/HNavbar";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <main>
      <HeaderTop/>
      <HeaderMain />
      <HNavbar />
      <Hero />
      <NewProducts />
      <Footer />
    </main>
  );
}
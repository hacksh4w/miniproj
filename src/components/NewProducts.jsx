'use client'
import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard";
import { supabase } from "../utils/supabase.js"; 

const productsData = [
  {
    img: "/jacket-1.jpg",
    title: "Jacket",
    desc: "MEN Yarn Fleece Full-Zip Jacket",
    rating: 4,
    price: "4500",
  },
  {
    img: "/skirt-1.jpg",
    title: "Skirt",
    desc: "Black Floral Wrap Midi Skirt",
    rating: 5,
    price: "5500",
  },
  {
    img: "/party-wear-1.jpg",
    title: "Party Wear",
    desc: "Women's Party Wear Shoes",
    rating: 3,
    price: "2500",
  },
  {
    img: "/shirt-1.jpg",
    title: "Shirt",
    desc: "Pure Garment Dyed Cotton Shirt",
    rating: 4,
    price: "4500",
  },
  {
    img: "/sports-1.jpg",
    title: "Sports",
    desc: "Trekking & Running Shoes - Black",
    rating: 3,
    price: "5800",
  },
  {
    img: "/watch-1.jpg",
    title: "Watches",
    desc: "Smart Watches Vital Plus",
    rating: 4,
    price: "100.00",
  },
  {
    img: "/watch-2.jpg",
    title: "Watches",
    desc: "Pocket Watch Leather Pouch",
    rating: 4,
    price: "12000",
  },
];

const NewProducts = () => {
  const [latestItems, setLatestItems] = useState([]);

  // fn to obtain latest items from the database
  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        // Fetch data from the 'items' table in Supabase, top 10 items
        const { data, error } = await supabase.from("items").select("*").order("updatedAt", { ascending: false }).limit(12);
        if (error) {
          throw error;
        }
        setLatestItems(data);
      } catch (error) {
        console.error("Error fetching latest items:", error.message);
      }
    };

    fetchLatestItems();
  }, []);

  return (
    <div className="container pt-16">
      <h2 className="font-medium text-2xl pb-4">New Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
        {latestItems.map((item, index) => (
          <ProductCard
            key={index}
            img={item.img}
            title={item.title}
            desc={item.desc}
            rating={item.rating}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;

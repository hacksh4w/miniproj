"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link.js";
import { supabase } from "../utils/supabase.js";

const NewProducts = () => {
  const [latestItems, setLatestItems] = useState([]);
  //key is product id
  // fn to obtain latest items from the database
  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(12);
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
      {latestItems.length === 0 ? (
        <p>No items available</p>
      ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
        {latestItems.map((item, index) => (
          <ProductCard
            key={index}
            img={item.imageUrl}
            type={item.type}
            desc={item.desc}
            rating={item.rating}
            price={item.price}
            item={item}
          />
        ))}
      </div> )}
    </div> 

  );
};

export default NewProducts;

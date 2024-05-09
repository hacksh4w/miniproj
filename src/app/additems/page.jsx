"use client"
import React, { useState } from 'react';
import { supabase } from '../../utils/supabase'; // assuming you have supabase configured

export default function AddItems (){
  const [formData, setFormData] = useState({
    name: '',
    shop_id: '',
    latitude: '',
    longitude: '',
    desc: '',
    type: '',
    price: 0,
    quantity: 0,
    brand: 0

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a unique product_id
      console.log("hi")
      console.log(formData)
      let product_id = `${Math.random().toString(36)}_${formData.shop_id}`;

      // Add product_id to formData
      const dataWithProductId = {
        ...formData,
        product_id
      };
      console.log(dataWithProductId)
      // Update Supabase with formData including product_id
      const { data, error } = await supabase.from('items').insert([dataWithProductId]);

      if (error) {
        throw error;
      }
      const { data: itemData, error: itemError } = await supabase
        .from('items')
        .select('id, shop_id')
        .eq('name', formData.name)
        .single();

      if (itemError) {
        throw itemError;
      }

      if (!itemData) {
        throw new Error('Item not found');
      }

      // Generate product_id using itemData's id and shop_id
      product_id = `${itemData.id}_${itemData.shop_id}`;

      // Update Supabase with formData including product_id
      const {a,b} = await supabase.from('items').delete().eq('name',formData.name).single()

      const { d, e } = await supabase.from('items').insert([{ ...formData, product_id }]);
      alert("Data inserted")
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="number" name="shop_id" value={formData.shop_id} onChange={handleChange} placeholder="Shop ID" />
      <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" />
      <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" /> 
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" /> 
      <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" />   
      <button type="submit">Submit</button>
    </form>
  );
};

"use client"

import { useState, useEffect } from 'react';
import { getDistance } from 'geolib';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { supabase } from '../../utils/supabase.js';
import "leaflet/dist/leaflet.css";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
// Mock JSON data
const jsonData = [
  { itemId: 1, quantity: 300, location: { latitude: 37.7749, longitude: -122.4194 } }, // Store A (San Francisco)
  { itemId: 1, quantity: 200, location: { latitude: 34.0522, longitude: -118.2437 } }, // Store B (Los Angeles)
  { itemId: 1, quantity: 100, location: { latitude: 40.734853, longitude: -74.02859 } }, // Store C (Hoboken)
  // Other items...
];

const MapComponent = ({ searchResults, userPos}) => {
  if (!searchResults.length) {
    return null; // If searchResults is empty, don't render anything
  }
  if(userPos){
    console.log(userPos)
  }
  return (
    <div className="mt-8 relative">
      <MapContainer center={[28.644800,77.216721]} zoom={10} style={{ height: '400px', width: '800px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleMarker center={[10.0040704,76.3068416]} fillColor="green" opacity={1}>
          <Popup>
            UserLocation: 10.0040704,76.3068416
          </Popup>
        </CircleMarker>
        {searchResults.map((item, index) => (
          <CircleMarker key={index} center={[item.location.latitude, item.location.longitude]} fillColor="orange" opacity={1}>
            <Popup>
              Item Name: {item.name}<br />
              Quantity: {item.quantity}<br />
              Location: {item.location.latitude}, {item.location.longitude}
              Shop: {item.brand}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
const Modal = ({ searchResults, onClose, onProceed, numberOfDays }) => {
  if(!searchResults.length){
    return null
  }
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price when searchResults change
    let totalPrice = 0;
    searchResults.forEach(item => {
      totalPrice += item.quantity * item.price * numberOfDays;
    });
    setTotalPrice(totalPrice);
  }, [searchResults, numberOfDays]);

  return (
    <div className="w-full h-full flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        {searchResults.map((item, index) => (
          <div key={index} className="mb-4">
            <p>{item.name} - Quantity: {item.quantity} - Total Item Price: INR {item.quantity * item.price * numberOfDays}</p>
          </div>
        ))}
        <p className="font-bold">Total Price: INR {totalPrice}</p>
        <div className="flex justify-end mt-4">
          <button className="mr-4 bg-orange-500 text-white rounded px-4 py-2" onClick={onProceed}>Proceed to Checkout</button>
          <button className="bg-black-300 text-black rounded px-4 py-2" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
const Bulk = () => {
  const toast = useToast({})
  const router = useRouter()
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalData,setTotalData]=useState([])
  const [userPos,setUserPos]=useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(1);
  useEffect(()=>{
    const fetchData = async()=>{
      const {data}=await supabase.from("items").select('*')
      const {data:{user}}=await supabase.auth.getUser() 
      console.log(user)
      console.log(data)
      setTotalData(data)
    }
    fetchData()
  },[])

  const handleSearch = () => {
    // Filter data based on entered item ID
    const transformedData = totalData.map(item => ({
      id: item.id,
      product_id: item.product_id,
      created_at: item.created_at,
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      rating: item.rating,
      updated_at: item.updated_at,
      shop_id:item.shop_id,
      category:item.category,
      brand:item.brand,
      quantity:item.quantity,
      location: {
        latitude: item.latitude,
        longitude: item.longitude
      }
    }));
    const filteredData = transformedData.filter(item => item.name === itemId);

    // Sort filtered stores based on distance from user
    navigator.geolocation.getCurrentPosition(({coords})=>{
      const {latitude,longitude}=coords
      setUserPos({latitude,longitude})
    })
    console.log(userPos)// New York City
    const sortedStores = filteredData.sort((a, b) => {
      const distanceA = getDistance(userPos, a.location);
      const distanceB = getDistance(userPos, b.location);
      return distanceA - distanceB;
    });

    // Find nearest stores to meet required quantity
    let remainingQuantity = parseInt(quantity);
    const selectedStores = [];
    sortedStores.forEach(store => {
      if (store.quantity >= remainingQuantity && remainingQuantity !== 0) {
        store.quantity = remainingQuantity;
        selectedStores.push(store);
        remainingQuantity = 0;
      } else if (store.quantity > 0 && remainingQuantity !== 0) {
        selectedStores.push(store);
        remainingQuantity -= store.quantity;
      }
    });
    if(remainingQuantity!=0){
      toast({
        title: 'Sorry! We dont have ample stock to meet your requirements. But we have curated the available stock for you! ',
        status: 'failure',
        isClosable: true,
        position: 'top',
      });
    }
    setSearchResults(selectedStores);
  };
  const handleSortByPrice = ()=>{
    navigator.geolocation.getCurrentPosition(({coords})=>{
      const {latitude,longitude}=coords
      setUserPos({latitude,longitude})
    })
    const transformedData = totalData.map(item => ({
      id: item.id,
      product_id: item.product_id,
      created_at: item.created_at,
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      rating: item.rating,
      updated_at: item.updated_at,
      shop_id:item.shop_id,
      category:item.category,
      brand:item.brand,
      quantity:item.quantity,
      location: {
        latitude: item.latitude,
        longitude: item.longitude
      }
    }));
    const filteredData = transformedData.filter(item => item.name === itemId);
  
    // Sort filtered data by price in increasing order
    const sortedData = filteredData.slice().sort((a, b) => a.price - b.price);
    let remainingQuantity = parseInt(quantity);
    const selectedStores = [];
    sortedData.forEach(store => {
      if (store.quantity >= remainingQuantity && remainingQuantity !== 0) {
        store.quantity = remainingQuantity;
        selectedStores.push(store);
        remainingQuantity = 0;
      } else if (store.quantity > 0 && remainingQuantity !== 0) {
        selectedStores.push(store);
        remainingQuantity -= store.quantity;
      }
    });
    setSearchResults(selectedStores);

   }
   const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  const handleProceedToCheckout = async () => {
    try {
      // Update item quantities
      const updates = searchResults.map(async (item) => {
        // Fetch the original item data from the database
        const { data: originalItem, error } = await supabase
          .from('items')
          .select('quantity')
          .eq('id', item.id)
          .single();
        
        if (error) {
          throw error;
        }
  
        if (!originalItem) {
          throw new Error(`Item with id ${item.id} not found`);
        }
  
        // Calculate the new quantity by subtracting item.quantity from the original quantity
        const newQuantity = originalItem.quantity - item.quantity;
  
        // Update the item quantity in the items table
        await supabase
          .from('items')
          .update({ quantity: newQuantity })
          .eq('id', item.id);
      });
  
      await Promise.all(updates);
  
      // Add rows to the orders table and notify user
      // (Code for adding rows to orders table goes here...)
      const orderInserts = searchResults.map(async (item) => {
        // Calculate total price for the item
        const totalPrice = item.quantity * item.price * numberOfDays;
  
        // Add a new row to the orders table
        await supabase
          .from('orders')
          .insert([
            {
              shop_name: item.brand,
              tot_price: totalPrice,
              status:'placed'
            }
          ]);
      });
  
      await Promise.all(orderInserts);
      alert('Order placed successfully!');
      router.push('/orderconfirm')
    } catch (error) {
      console.error('Error proceeding to checkout:', error.message);
      // Handle error
    }
  };





  return (
    <div className="relative flex flex-col items-center justify-center mt-8">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Place Bulk Order!</h1>
      <div className="flex">
        <input className="p-2 mr-4 border border-gray-300 rounded-lg" type="text" placeholder="Item ID" value={itemId} onChange={e => setItemId(e.target.value)} />
        <input className="p-2 mr-4 border border-gray-300 rounded-lg" type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <p className='mt-2 mr-2'>Days</p>
        <input className="p-2 mr-4 border border-gray-300 rounded-lg" type="number" placeholder="No. of Days" value={numberOfDays} onChange={e => setNumberOfDays(e.target.value)} />
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg" onClick={handleSearch}>Search</button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg ml-2" onClick={handleSortByPrice}>Sort by Price</button>
      </div>
      <MapComponent searchResults={searchResults} userPos={userPos}/ >
      {
        searchResults.length!=0 ? ( <button className="px-4 py-2 bg-orange-500 text-white rounded-lg ml-2" onClick={handleViewDetails}>View Details</button> ): (<div></div>)
      }
     <div className='m-4'></div>
      {
        isModalOpen && <Modal searchResults={searchResults} onClose={handleCloseModal} onProceed={handleProceedToCheckout} numberOfDays={numberOfDays}/>
      }
      <div className='m-2'></div>
    </div>
  );
};

export default Bulk;

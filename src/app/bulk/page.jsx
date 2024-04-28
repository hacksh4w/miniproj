"use client"
import { useState, useEffect } from 'react';
import { getDistance } from 'geolib';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { createClient } from '@supabase/supabase-js';
import "leaflet/dist/leaflet.css";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { Button } from '@/components';

const supabase = createClient('https://kyioaeboxgtgzbtypztn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5aW9hZWJveGd0Z3pidHlwenRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwOTgwNTQsImV4cCI6MjAyOTY3NDA1NH0.0KmR9sAOwZwinkPhFK1ecn7OSb7gi3XIM3ct6ikPrZA')

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
              Item ID: {item.name}<br />
              Quantity: {item.quantity}<br />
              Location: {item.location.latitude}, {item.location.longitude}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
const Modal = ({ searchResults, onClose, onProceed }) => {
  if(!searchResults.length){
    return null
  }
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price when searchResults change
    let totalPrice = 0;
    searchResults.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    setTotalPrice(totalPrice);
  }, [searchResults]);

  return (
    <div className="w-full h-full flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        {searchResults.map((item, index) => (
          <div key={index} className="mb-4">
            <p>{item.name} - Quantity: {item.quantity} - Total Item Price: INR {item.quantity * item.price}</p>
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
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalData,setTotalData]=useState([])
  const [userPos,setUserPos]=useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleProceedToCheckout = () => {
    // Implement logic for proceeding to checkout
    // This function will be called when the "Proceed to Checkout" button is clicked in the modal
  };
  return (
    <div className="relative flex flex-col items-center justify-center mt-8">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Place Bulk Order!</h1>
      <div className="flex">
        <input className="p-2 mr-4 border border-gray-300 rounded-lg" type="text" placeholder="Item ID" value={itemId} onChange={e => setItemId(e.target.value)} />
        <input className="p-2 mr-4 border border-gray-300 rounded-lg" type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg" onClick={handleSearch}>Search</button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg ml-2" onClick={handleSortByPrice}>Sort by Price</button>
      </div>
      <MapComponent searchResults={searchResults} userPos={userPos}/ >
      {
        searchResults.length!=0 ? ( <button className="px-4 py-2 bg-orange-500 text-white rounded-lg ml-2" onClick={handleViewDetails}>View Details</button> ): (<div></div>)
      }
     <div className='m-4'></div>
      {
        isModalOpen && <Modal searchResults={searchResults} onClose={handleCloseModal} onProceed={handleProceedToCheckout} />
      }
      <div className='m-2'></div>
    </div>
  );
};

export default Bulk;

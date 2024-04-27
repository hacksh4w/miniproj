"use client"
import { useState } from 'react';
import { getDistance } from 'geolib';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

// Mock JSON data
const jsonData = [
  { itemId: 1, quantity: 300, location: { latitude: 37.7749, longitude: -122.4194 } }, // Store A (San Francisco)
  { itemId: 1, quantity: 200, location: { latitude: 34.0522, longitude: -118.2437 } }, // Store B (Los Angeles)
  { itemId: 1, quantity: 100, location: { latitude: 40.734853, longitude: -74.02859 } }, // Store C (Hoboken)
  // Other items...
];

const MapComponent = ({ searchResults }) => {
  if (!searchResults.length) {
    return null; // If searchResults is empty, don't render anything
  }
 
  
  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={10} style={{ height: '400px', width: '800px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {searchResults.map((item, index) => (
        <CircleMarker key={index} center={[item.location.latitude, item.location.longitude]} fillColor="blue" opacity={1}>
          <Popup>
            Item ID: {item.itemId}<br />
            Quantity: {item.quantity}<br />
            Location: {item.location.latitude}, {item.location.longitude}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

const Bulk = () => {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Filter data based on entered item ID
    const filteredData = jsonData.filter(item => item.itemId === parseInt(itemId));

    // Sort filtered stores based on distance from user
    const userLocation = { latitude: 40.7128, longitude: -74.0060 }; // New York City
    const sortedStores = filteredData.sort((a, b) => {
      const distanceA = getDistance(userLocation, a.location);
      const distanceB = getDistance(userLocation, b.location);
      return distanceA - distanceB;
    });

    // Find nearest stores to meet required quantity
    let remainingQuantity = parseInt(quantity);
    const selectedStores = [];
    sortedStores.forEach(store => {
      if (store.quantity >= remainingQuantity && remainingQuantity !== 0) {
        let buffer = store.quantity
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

  return (
    <div>
      <input type="text" placeholder="Item ID" value={itemId} onChange={e => setItemId(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <MapComponent searchResults={searchResults} />
    </div>
  );
};

export default Bulk;

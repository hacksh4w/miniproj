"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
const OrderConfirm = () => {
    const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Thank You!</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Thank you for shopping at Ensemble Haven.</p>
        
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" onClick={router.push("/home")}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderConfirm;

// src/components/ServicePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services'); // Adjust the endpoint as needed
        setServices(response.data); // Assuming response.data is an array of services
      } catch (error) {
        toast.error('Failed to fetch services. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading services...</div>; // Loading indicator
  }

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3 md:p-20">
        {services.map((service) => (
          <div 
            key={service._id} 
            className="bg-gradient-to-r from-gray-900 to-gray-950 p-6 rounded-lg shadow-lg "
          >
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">{service.service}</h3>
            <p className="text-gray-200 mb-4">{service.description}</p>
            <p className="text-lg font-bold text-yellow-300">{service.price}</p>
            <p className="text-gray-400">Provider: <span className="font-medium">{service.provider}</span></p>
            <p className="text-gray-400">Duration: <span className="font-medium">{service.duration}</span></p>
            <p className="text-gray-400">Category: <span className="font-medium">{service.category}</span></p>
            <h4 className="text-md font-semibold mt-4 text-blue-400">Features:</h4>
            <ul className="list-disc list-inside text-gray-300">
              {service.features.map((feature, index) => (
                <li key={index} className="ml-4">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;

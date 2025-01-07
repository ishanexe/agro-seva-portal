// src/components/Services/ServicesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicesList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get('http://localhost:5000/services');
            setServices(response.data);
        };
        fetchServices();
    }, []);

    return (
        <div>
            <h1>Services List</h1>
            <ul>
                {services.map(service => (
                    <li key={service._id}>{service.serviceName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServicesList;

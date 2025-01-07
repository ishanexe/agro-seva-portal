// src/components/Farmers/FarmersList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmersList = () => {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        const fetchFarmers = async () => {
            const response = await axios.get('http://localhost:5000/farmers');
            setFarmers(response.data);
        };
        fetchFarmers();
    }, []);

    return (
        <div>
            <h1>Farmers List</h1>
            <ul>
                {farmers.map(farmer => (
                    <li key={farmer._id}>{farmer.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FarmersList;

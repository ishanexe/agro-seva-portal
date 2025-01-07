// src/components/Farmers/AddFarmer.js
import React, { useState } from 'react';
import axios from 'axios';

const AddFarmer = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const farmer = { name, contact, address };
        await axios.post('http://localhost:5000/farmers', farmer);
        // Reset fields or redirect as necessary
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Farmer</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
            <button type="submit">Add Farmer</button>
        </form>
    );
};

export default AddFarmer;

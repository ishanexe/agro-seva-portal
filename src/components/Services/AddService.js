// src/components/Services/AddService.js
import React, { useState } from 'react';
import axios from 'axios';

const AddService = () => {
    const [serviceName, setServiceName] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const service = { serviceName, desc };
        await axios.post('http://localhost:5000/services', service);
        // Reset fields or redirect as necessary
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Service</h1>
            <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="Service Name" required />
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" required />
            <button type="submit">Add Service</button>
        </form>
    );
};

export default AddService;

import React from 'react';
import { Link } from 'react-router-dom';

const FarmerHome = () => {
    return (
        <div>
            <h1>Farmer Home</h1>
            <ul>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/weather-updates">Weather Updates</Link></li>
                <li><Link to="/market-info">Market Information</Link></li>
            </ul>
        </div>
    );
};

export default FarmerHome;

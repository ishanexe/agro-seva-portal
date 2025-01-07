// src/components/MarketPrices.js
import React from 'react';

const MarketPrices = () => {
    return (
        <div>
            <h2>Current Market Prices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Crop</th>
                        <th>Price per Kg</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Wheat</td>
                        <td>$0.25</td>
                    </tr>
                    <tr>
                        <td>Rice</td>
                        <td>$0.30</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MarketPrices; // Ensure this is a default export

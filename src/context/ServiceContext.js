// src/context/ServiceContext.js
import React, { createContext, useState } from 'react';

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const [requestedServices, setRequestedServices] = useState({}); // { serviceId: isRequested }

    const requestService = (id) => {
        setRequestedServices((prev) => ({ ...prev, [id]: true }));
    };

    const isRequested = (id) => {
        return requestedServices[id] || false; // Returns true if requested, false otherwise
    };

    return (
        <ServiceContext.Provider value={{ requestService, isRequested }}>
            {children}
        </ServiceContext.Provider>
    );
};

// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null); // Start with no token

    const login = (userToken) => {
        setToken(userToken); // Set the token on login
    };

    const logout = () => {
        setToken(null); // Clear the token on logout
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const increaseCartCount = () => {
        setCartCount(prevCount => prevCount + 1);
    };

    const decreaseCartCount = () => {
        setCartCount(prevCount => Math.max(0, prevCount - 1)); // Prevents negative cart count
    };

    const resetCartCount = () => {
        setCartCount(0); // Resets cart count to 0
    };

    return (
        <CartContext.Provider value={{ cartCount, increaseCartCount, decreaseCartCount, resetCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

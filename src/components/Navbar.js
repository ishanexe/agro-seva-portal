// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Ensure this path is correct
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
    const navigate = useNavigate();
    const { cartCount } = useContext(CartContext); // Get cart count from context
    const token = localStorage.getItem('token'); // Check if the user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('userType'); // Optionally remove userType
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Agro Seva Portal</h1>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {token && (
                    <>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/weather-updates">Weather Updates</Link></li>
                        <li><Link to="/market-info">Market Info</Link></li>
                        <li><Link to="/advisories">Advisories</Link></li>
                        <li>
                            <Link to="/cart">
                                <button className="crt">Cart ({cartCount})</button>
                            </Link>
                        </li>
                    </>
                )}
                {!token ? (
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <li className="logout-button">
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

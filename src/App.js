import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import FarmerHome from './components/FarmerHome';
import UserHome from './components/UserHome';
import Services from './components/Services';
import WeatherUpdates from './components/WeatherUpdates';
import MarketInfo from './components/MarketInfo';
import ServiceDetail from './components/ServiceDetail';
import Advisories from './components/Advisories'; // Import the Advisories component
import { CartProvider } from './context/CartContext';
import { ServiceProvider } from './context/ServiceContext';
import './components/Services.css';

const servicesData = [
    { id: 1, name: 'Service 1', description: 'Description for Service 1' },
    { id: 2, name: 'Service 2', description: 'Description for Service 2' },
    { id: 3, name: 'Service 3', description: 'Description for Service 3' },
    { id: 4, name: 'Service 4', description: 'Description for Service 4' },
];

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);

    return children;
};

const App = () => {
    return (
        <CartProvider>
            <ServiceProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/farmer-home" element={<PrivateRoute><FarmerHome /></PrivateRoute>} />
                        <Route path="/user-home" element={<PrivateRoute><UserHome /></PrivateRoute>} />
                        <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
                        <Route path="/weather-updates" element={<PrivateRoute><WeatherUpdates /></PrivateRoute>} />
                        <Route path="/market-info" element={<PrivateRoute><MarketInfo /></PrivateRoute>} />
                        <Route path="/advisories" element={<PrivateRoute><Advisories /></PrivateRoute>} /> {/* Add the advisories route */}
                        <Route path="/services/:id" element={<ServiceDetail servicesData={servicesData} />} />
                    </Routes>
                </Router>
            </ServiceProvider>
        </CartProvider>
    );
};

export default App;

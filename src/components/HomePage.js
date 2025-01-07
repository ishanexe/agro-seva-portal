// src/components/HomePage.js
import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const HomePage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleExploreClick = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div>
            <div className="hero">
                <video className="hero-video" autoPlay loop muted>
                    <source src="/images/cinema.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-content">
                    <h2>Welcome to Agro Seva</h2>
                    <p>Empowering Farmers for a Better Tomorrow</p>
                    <button className="hero-button" onClick={handleExploreClick}>
                        Explore Services
                    </button>
                </div>
            </div>
            <section className="features">
                <div className="card">
                    <h3>Services</h3>
                    <p>Explore our wide range of services tailored for farmers.</p>
                </div>
                <div className="card">
                    <h3>Weather Updates</h3>
                    <p>Stay updated with the latest weather forecasts.</p>
                </div>
                <div className="card">
                    <h3>Market Info</h3>
                    <p>Get real-time market information to make informed decisions.</p>
                </div>
                <div className="card">
                    <h3>Advisories</h3>
                    <p>Read advisories from experts to improve your farming practices.</p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

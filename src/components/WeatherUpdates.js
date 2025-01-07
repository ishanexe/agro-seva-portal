import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherUpdates.css';

const weatherImages = {
    'Sunny': 'Sunny.png',
    'Cloudy': 'Cloudy.png',
    'Rain': 'Rainy.png',
    'Storm': 'Stormy.png',
    'Snow': 'Snowy.png',
    'Wind': 'Windy.png',
    'Fog': 'Foggy.png',
    'Drizzle': 'Rainy.png',  // Fallback to 'Rain'
    'Partly': 'Cloudy.png',  // Fallback to 'Cloudy'
    'Hail': 'Hail.png',
};

const WeatherUpdates = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [cityName, setCityName] = useState('');

    const fetchWeatherData = async (city) => {
        try {
            const apiKey = '41b8c48a6e5c45d8b0f160839241910'; // Your new API key
            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`);

            if (response.status === 200) {
                setWeatherData(response.data);
            } else {
                throw new Error('Unexpected response');
            }
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError('Error fetching weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cityName) {
            setLoading(true);
            fetchWeatherData(cityName);
        }
    };

    useEffect(() => {
        fetchWeatherData('London'); // Default city
    }, []);

    // Center loading and error messages
    const centeredStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        textAlign: 'center',
    };

    if (loading) {
        return (
            <div style={centeredStyle}>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={centeredStyle}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="weather-container">
            <div className="weather-info">
                {weatherData && (
                    <>
                        <h2 className="city-name">{weatherData.location.name}</h2>
                        <div className="current-conditions">
                            <p className="temperature">{Math.round(weatherData.current.temp_c)}°C</p>
                            <p>{weatherData.current.condition.text}</p>
                            <img
                                className="weather-icon"
                                src={`/images/${weatherImages[weatherData.current.condition.text.split(' ')[0]] || 'Sunny.png'}`} // Fallback to Sunny if not found
                                alt={weatherData.current.condition.text}
                            />
                        </div>
                        <div className="air-conditions">
                            <h3>Air Conditions</h3>
                            <p>Humidity: {weatherData.current.humidity}%</p>
                            <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
                            <p>Pressure: {weatherData.current.pressure_mb} hPa</p>
                        </div>
                        <div className="forecast-div">
                            <h3>Today's Forecast</h3>
                            <div className="today-forecast">
                                {weatherData.forecast.forecastday[0].hour.filter((hour) => {
                                    const hourTime = new Date(hour.time).getHours();
                                    return hourTime === 6 || hourTime === 12 || hourTime === 18 || hourTime === 0;
                                }).map((hour) => (
                                    <div key={hour.time} className="hourly-forecast">
                                        <p>{hour.time.split(' ')[1]}</p>
                                        <p>{Math.round(hour.temp_c)}°C</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sevenBaap">
                            <div className="seven-day-forecast">
                                <h3>7-Day Forecast</h3>
                                {weatherData.forecast.forecastday.map((day) => (
                                    <div key={day.date} className="forecast-day">
                                        <h4>{day.date}</h4>
                                        <p>Condition: {day.day.condition.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="city-form">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Enter city name" 
                        value={cityName} 
                        onChange={(e) => setCityName(e.target.value)} 
                        required 
                    />
                    <button type="submit">Get Weather</button>
                </form>
            </div>
        </div>
    );
};

export default WeatherUpdates;

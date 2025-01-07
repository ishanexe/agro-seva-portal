import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { CartContext } from '../context/CartContext';
import './ServiceDetail.css';

const ServiceDetail = ({ servicesData }) => {
    const { id } = useParams(); // Get the id from URL
    const { increaseCartCount, decreaseCartCount } = useContext(CartContext);
    const [isRequested, setIsRequested] = useState(false);
    const [service, setService] = useState(null);

    useEffect(() => {
        // Find the service based on the id
        const foundService = servicesData.find((service) => service.id === parseInt(id));
        setService(foundService);

        // Check for existing requests in local storage
        const requestedServices = JSON.parse(localStorage.getItem('requestedServices')) || {};
        if (requestedServices[id]) {
            setIsRequested(true);
        }
    }, [id, servicesData]);

    const handleRequest = () => {
        if (!isRequested) {
            increaseCartCount();
            setIsRequested(true);
            updateRequestedServices(true);
        } else {
            decreaseCartCount();
            setIsRequested(false);
            updateRequestedServices(false);
        }
    };

    const updateRequestedServices = (isRequested) => {
        const requestedServices = JSON.parse(localStorage.getItem('requestedServices')) || {};
        requestedServices[id] = isRequested;
        localStorage.setItem('requestedServices', JSON.stringify(requestedServices));
    };

    // Handle the case where service is not defined
    if (!service) {
        return <div>Service not found.</div>;
    }

    return (
        <div className="service-detail">
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <button
                className={`request-button ${isRequested ? 'requested' : ''}`}
                onClick={handleRequest}
            >
                {isRequested ? 'Retrieve' : 'Request'}
            </button>
        </div>
    );
};

export default ServiceDetail;

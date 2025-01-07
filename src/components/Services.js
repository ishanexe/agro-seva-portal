import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const servicesData = [
        {
            id: 1,
            name: 'Soil Testing Service',
            description: 'The Soil Testing Service helps farmers assess the nutrient content, pH level, and overall health of their soil. By understanding the soil\'s properties, farmers can make informed decisions on fertilizer use and crop selection, ultimately leading to better yield and sustainable farming practices.'
        },
        {
            id: 2,
            name: 'Crop Insurance Scheme',
            description: 'The Crop Insurance Scheme offers financial protection to farmers against crop loss due to unforeseen events such as natural disasters, pests, or diseases. This service aims to stabilize farmers\' incomes and encourage them to adopt new technologies and practices without the fear of significant financial loss.'
        },
        {
            id: 3,
            name: 'Subsidy Programs for Seeds and Fertilizers',
            description: 'The Subsidy Programs provide financial assistance to farmers for purchasing quality seeds and fertilizers at reduced prices. This service aims to promote the use of high-quality agricultural inputs, enhancing productivity and ensuring food security.'
        },
        {
            id: 4,
            name: 'Agricultural Extension Services',
            description: 'Agricultural Extension Services provide farmers with essential information and training on modern farming techniques, pest management, crop rotation, and sustainable agricultural practices. This service aims to improve farmers\' knowledge and skills, enabling them to increase their productivity and profitability.'
        },
    ];

    return (
        <div className="services-container">
            <h1>Our Services</h1>
            <div className="services-grid">
                {servicesData.map((service) => (
                    <div key={service.id} className="service-card">
                        <Link to={`/services/${service.id}`}>
                            <h2>{service.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;

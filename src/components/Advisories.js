import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Advisories.css';

const Advisories = () => {
    const [advisories, setAdvisories] = useState([]);
    const [newAdvisory, setNewAdvisory] = useState('');
    const [error, setError] = useState('');

    // Fetch advisories when the component mounts
    useEffect(() => {
        const fetchAdvisories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/advisories');
                setAdvisories(response.data);
            } catch (error) {
                console.error('Error fetching advisories:', error);
                setError('Failed to fetch advisories. Please try again.');
            }
        };

        fetchAdvisories();
    }, []);

    // Handle posting a new advisory
    const handlePostAdvisory = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/advisories', { content: newAdvisory });
            setAdvisories([...advisories, response.data]);
            setNewAdvisory('');
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error posting advisory:', error);
            setError('Failed to post advisory. Please try again.');
        }
    };

    return (
        <div className="advisories-container">
            <h2 className="adv">Advisories</h2>
            {error && <p className="error">{error}</p>} {/* Display error message */}
            <div className="advisory-input">
                <textarea
                    value={newAdvisory}
                    onChange={(e) => setNewAdvisory(e.target.value)}
                    placeholder="Write your advisory here..."
                />
                <button className="post-advisory-button" onClick={handlePostAdvisory}>
                    Post Advisory
                </button>
            </div>
            <ul className="advisories-list">
                {advisories.map((advisory, index) => (
                    <li key={index} className="advisory-item">{advisory.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Advisories;

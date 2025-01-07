import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './MarketInfo.css'; // Import your CSS file for styling

const MarketInfo = () => {
    const [marketData, setMarketData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState({ state: '', district: '' });
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        Papa.parse('/data/market_prices.csv', {
            header: true,
            download: true,
            complete: (results) => {
                setMarketData(results.data);
                setFilteredData(results.data);
            },
            error: (error) => {
                console.error('Error fetching market data:', error);
            }
        });
    }, []);

    // Filtering logic
    const fetchData = () => {
        const filtered = marketData.filter(item => {
            return (
                (filter.state ? item.State.toLowerCase().includes(filter.state.toLowerCase()) : true) &&
                (filter.district ? item.District.toLowerCase().includes(filter.district.toLowerCase()) : true)
            );
        });
        setFilteredData(filtered);
    };

    // Sorting logic
    const sortData = (field) => {
        const sortedData = [...filteredData].sort((a, b) => {
            return sortBy === 'asc'
                ? a[field] - b[field]
                : b[field] - a[field];
        });
        setFilteredData(sortedData);
        setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <h2>Market Information</h2>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by State"
                    className="filter-input"
                    onChange={(e) => setFilter({ ...filter, state: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Filter by District"
                    className="filter-input"
                    onChange={(e) => setFilter({ ...filter, district: e.target.value })}
                />
                <button onClick={fetchData} className="fetch-button">Fetch Data</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortData('State')}>State</th>
                        <th onClick={() => sortData('District')}>District</th>
                        <th onClick={() => sortData('Market')}>Market</th>
                        <th onClick={() => sortData('Commodity')}>Commodity</th>
                        <th onClick={() => sortData('Variety')}>Variety</th>
                        <th onClick={() => sortData('Arrival_Date')}>Arrival Date</th>
                        <th onClick={() => sortData('Min Price')}>Min Price</th>
                        <th onClick={() => sortData('Max Price')}>Max Price</th>
                        <th onClick={() => sortData('Modal Price')}>Modal Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.State}</td>
                            <td>{item.District}</td>
                            <td>{item.Market}</td>
                            <td>{item.Commodity}</td>
                            <td>{item.Variety}</td>
                            <td>{item.Arrival_Date}</td>
                            <td>{item['Min Price']}</td>
                            <td>{item['Max Price']}</td>
                            <td>{item['Modal Price']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarketInfo;

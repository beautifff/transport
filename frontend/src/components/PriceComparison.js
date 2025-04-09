import React, { useState } from 'react';
import './PriceComparison.css';

function PriceComparison() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/compare-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCity,
          toCity,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch price comparison data. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="price-comparison">
      <div className="main-content">
        <div className="transport-info">
          <h2>Compare Transport Prices</h2>
          <p>Find the best transport options for your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="filters">
          <div className="filter-group">
            <label htmlFor="fromCity">From:</label>
            <input
              type="text"
              id="fromCity"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Enter departure city"
              required
            />
          </div>

          <div className="filter-group">
            <label htmlFor="toCity">To:</label>
            <input
              type="text"
              id="toCity"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Enter destination city"
              required
            />
          </div>

          <div className="filter-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Compare Prices'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading && <div className="loading">Loading results...</div>}

        {!loading && !error && results.length > 0 && (
          <div className="results">
            <table>
              <thead>
                <tr>
                  <th>Transport Type</th>
                  <th>Company</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Duration</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.type}</td>
                    <td>{result.company}</td>
                    <td>{result.departureTime}</td>
                    <td>{result.arrivalTime}</td>
                    <td>{result.duration}</td>
                    <td>{result.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="no-results">
            No results found. Try different search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default PriceComparison; 
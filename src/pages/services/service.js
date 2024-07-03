import React, { useState } from 'react';
import './service.css';
import axios from 'axios';
import ContentHeader from './header';

function Interaction() {
  const [clientName, setClientName] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchStats = async () => {
    console.log(`Fetching stats for client: ${clientName}`);
    try {
      const response = await axios.post('http://localhost:5000/socialStats', { clientName });
      console.log('Response data:', response.data);
      setStats(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Client not found or error fetching data');
      setStats(null);
    }
  };

  return (
    <div className='head'>
      <ContentHeader />
      <div className='interaction-container'>
        <header className="interaction-header">
          <h1>Social Media Tracker</h1>
        </header>
        <div className="interaction-content">
          <h2 className='title'>Statistiques des Interactions des Publications</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleFetchStats(); }}>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nom du client"
            />
            <button type="submit" className='bouton'>Rechercher</button>
          </form>
          {error && <p className="error">{error}</p>}
          {stats && (
            <div className="social-stats">
              <div className="stats-card">
                <h4>Client Info</h4>
                <p>Name: {stats.client.name}</p>
                <p>Facebook Stats: Likes - {stats.client.interactions[0].facebook.likes}, Comments - {stats.client.interactions[0].facebook.comments}, Shares - {stats.client.interactions[0].facebook.shares}</p>
                {/* Add Instagram and LinkedIn stats here */}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Interaction;

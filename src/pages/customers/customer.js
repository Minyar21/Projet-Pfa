import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.css';
import ContentHeader from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

function Customers() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '', instagram: '', facebook: '', linkedin: '' });
  const [editClient, setEditClient] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
      });
  }, []);

  const handleAddClient = () => {
    axios.post('http://localhost:5000/api/customers', newClient)
      .then(response => {
        setClients([...clients, response.data]);
        setNewClient({ name: '', email: '', phone: '', address: '', instagram: '', facebook: '', linkedin: '' });
      })
      .catch(error => {
        console.error('There was an error adding the customer!', error);
      });
  };

  const handleEditClient = (client) => {
    setEditClient(client);
  };

  const handleUpdateClient = () => {
    axios.put(`http://localhost:5000/api/customers/${editClient._id}`, editClient)
      .then(response => {
        setClients(clients.map(client => (client._id === editClient._id ? response.data : client)));
        setEditClient(null);
      })
      .catch(error => {
        console.error('There was an error updating the customer!', error);
      });
  };

  const handleDeleteClient = (id) => {
    axios.delete(`http://localhost:5000/api/customers/${id}`)
      .then(() => {
        setClients(clients.filter(client => client._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the customer!', error);
      });
  };

  const redirectToUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className='header'>
      <ContentHeader />
      <div className="customers">
        <h2>Customer Management</h2>
        <div className="client-form">
          <input
            type="text"
            placeholder="Name"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={newClient.address}
            onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Instagram URL"
            value={newClient.instagram}
            onChange={(e) => setNewClient({ ...newClient, instagram: e.target.value })}
          />
          <input
            type="text"
            placeholder="Facebook URL"
            value={newClient.facebook}
            onChange={(e) => setNewClient({ ...newClient, facebook: e.target.value })}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={newClient.linkedin}
            onChange={(e) => setNewClient({ ...newClient, linkedin: e.target.value })}
          />
          <button onClick={handleAddClient}>Add a Customer</button>
        </div>

        {editClient && (
          <div className="client-form">
            <input
              type="text"
              placeholder="Name"
              value={editClient.name}
              onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={editClient.email}
              onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={editClient.address}
              onChange={(e) => setEditClient({ ...editClient, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={editClient.phone}
              onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Instagram URL"
              value={editClient.instagram}
              onChange={(e) => setEditClient({ ...editClient, instagram: e.target.value })}
            />
            <input
              type="text"
              placeholder="Facebook URL"
              value={editClient.facebook}
              onChange={(e) => setEditClient({ ...editClient, facebook: e.target.value })}
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={editClient.linkedin}
              onChange={(e) => setEditClient({ ...editClient, linkedin: e.target.value })}
            />
            <button onClick={handleUpdateClient}>Update Customer</button>
          </div>
        )}

        <div className="client-list">
          <h3>Customer List</h3>
          <ul>
            {clients.map(client => (
              <li key={client._id}>
                <span>{client.name} - {client.email} - {client.address} - {client.phone}</span>
                <span>Added on: {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : 'Unknown'}</span>
                <div className="icon-links">
                  {client.instagram && (
                    <FontAwesomeIcon icon={faInstagram} onClick={() => redirectToUrl(client.instagram)} />
                  )}
                  {client.facebook && (
                    <FontAwesomeIcon icon={faFacebook} onClick={() => redirectToUrl(client.facebook)} />
                  )}
                  {client.linkedin && (
                    <FontAwesomeIcon icon={faLinkedin} onClick={() => redirectToUrl(client.linkedin)} />
                  )}
                </div>
                <button onClick={() => handleEditClient(client)}>Edit</button>
                <button onClick={() => handleDeleteClient(client._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Customers;

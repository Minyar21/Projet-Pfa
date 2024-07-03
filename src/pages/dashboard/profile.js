import React, { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import ProfileHeader from "./profileHeader"; 
import '../styles/profile.css';
import axios from 'axios';

const Profile = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
      });
  }, []);

  return (
    <div className='profile'>
      <ProfileHeader />
      <div className="profile-card">
        <h2 className='recent'>Recent Customers</h2>
        {clients.slice(-3).map(client => (
          <div key={client._id}>
            <div className="profile-header">
              <img src="https://via.placeholder.com/150" alt="Profile" className="profile-pic" />
              <h2 className="profile-name">{client.name}</h2>
            </div>
            <div className="profile-body">
              <div className="profile-info">
                <FaInstagram className='icon-media'/>
                <a href={client.instagram} target="_blank" rel="noopener noreferrer" className='social-media'>Instagram</a>
              </div>
              <div className="profile-info">
                <FaFacebook className='icon-media'/>
                <a href={client.facebook} target="_blank" rel="noopener noreferrer" className='social-media'>Facebook</a>
              </div>
              <div className="profile-info">
                <FaLinkedin className='icon-media'/>
                <a href={client.linkedin} target="_blank" rel="noopener noreferrer" className='social-media'>LinkedIn</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

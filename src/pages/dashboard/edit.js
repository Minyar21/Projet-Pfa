import React, { useState } from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './edit.css';

import ContentHeader from './contentHeader';

const EditProfile = ({ addCustomer, customers }) => {
  const [facebookUrl, setFacebookUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [allCustomers, setAllCustomers] = useState(customers);

  const extractUsername = (url) => {
    // Function to extract username from social media URL
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:facebook|linkedin|instagram)\.com\/([a-zA-Z0-9_]+)/;
    const match = url.match(regex);
    return match ? match[1] : ''; // Return username part if URL matches
  };

  const handleSave = () => {
    if (typeof addCustomer === 'function') {
      const newCustomer = { 
        facebook: extractUsername(facebookUrl), 
        linkedin: extractUsername(linkedinUrl), 
        instagram: extractUsername(instagramUrl),
        createdAt: new Date().toLocaleDateString() 
      };
      addCustomer(newCustomer);
      setAllCustomers([...allCustomers, newCustomer]);
      setFacebookUrl('');
      setLinkedinUrl('');
      setInstagramUrl('');
    } else {
      console.error('addCustomer is not a function');
    }
  };

  const handleEdit = (index) => {
    // Define your edit logic here
    console.log(`Editing customer at index ${index}`);
    // Example: You can pre-fill the form fields with existing customer data for editing
    const customerToEdit = allCustomers[index];
    setFacebookUrl(customerToEdit.facebook); // Assuming `facebook` holds username, not URL
    setLinkedinUrl(customerToEdit.linkedin); // Assuming `linkedin` holds username, not URL
    setInstagramUrl(customerToEdit.instagram); // Assuming `instagram` holds username, not URL
  };

  const handleDelete = (index) => {
    // Define your delete logic here
    console.log(`Deleting customer at index ${index}`);
    const updatedCustomers = [...allCustomers];
    updatedCustomers.splice(index, 1);
    setAllCustomers(updatedCustomers);
  };

  return (
    <div className='header'>
      <ContentHeader/>
      <div className="edit-profile">
        
        <form>
          <h2 className='EDIT' >Edit Profile</h2>
          <div className="form-group">
            <label>Facebook URL </label>
            <input 
              type="text" 
              value={facebookUrl} 
              onChange={(e) => setFacebookUrl(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>LinkedIn URL </label>
            <input 
              type="text" 
              value={linkedinUrl} 
              onChange={(e) => setLinkedinUrl(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Instagram URL </label>
            <input 
              type="text" 
              value={instagramUrl} 
              onChange={(e) => setInstagramUrl(e.target.value)} 
            />
          </div>
          <button className='bouton' type="button" onClick={handleSave}>Save</button>
        </form>

        
        <div className="customer-table">
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Facebook</th>
                <th>LinkedIn</th>
                <th>Instagram</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allCustomers && allCustomers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.name}</td>
                  <td>{customer.facebook}</td>
                  <td>{customer.linkedin}</td>
                  <td>{customer.instagram}</td>
                  <td>{customer.createdAt}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
    
  );
};

export default EditProfile;

import React, { useState } from 'react';
import './settings.css';
import ContentHeader from './header'; 

const Settings = () => {
  const [language, setLanguage] = useState('en');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log('Changes saved:', { language, name, email, profilePic });
    // Here you can add logic to save changes, like making API calls to update user settings
  };

  // Define language-specific content
  const languageContent = {
    en: {
      changeLanguage: 'Change Language',
      editAccountInfo: 'Edit Account Information',
      nameLabel: 'Name:',
      emailLabel: 'Email:',
      saveChanges: 'Save Changes'
    },
    fr: {
      changeLanguage: 'Changer la langue',
      editAccountInfo: 'Modifier les informations du compte',
      nameLabel: 'Nom :',
      emailLabel: 'Email :',
      saveChanges: 'Sauvegarder les modifications'
    },
    // Add other languages as needed
  };

  return (
    <div className='head'>
      <ContentHeader/>
      <div className="settings">
        <h2>Settings</h2>
      
        <div className="settings-section">
          <h3>{languageContent[language].changeLanguage}</h3>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="fr">Français</option>
            {/* Add other language options as needed */}
          </select>
        </div>
      
        <div className="settings-section">
          <h3>{languageContent[language].editAccountInfo}</h3>
          <label>
            {languageContent[language].nameLabel}
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            {languageContent[language].emailLabel}
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
        </div>
      
        <div className="settings-section">
          <h3>Change Profile Picture</h3>
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        </div>
      
        <button className="save-button" onClick={handleSaveChanges}>{languageContent[language].saveChanges}</button>
      </div>
    </div>
  );
};

export default Settings;

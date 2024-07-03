import React from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from 'react-router-dom';
 

const ProfileHeader = () => {
  return (
    <div className="profile--header">
      <h2 className="header--title">Customers</h2>
      <Link to="/edit" className="edit">
        <BiEdit className="icon" />
      </Link>
    </div>
  );
};

export default ProfileHeader;

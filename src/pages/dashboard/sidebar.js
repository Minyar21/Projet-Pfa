import React from "react";
import { BiHome, BiSolidHand, BiSolidReport, BiStats, BiLogOut, BiGroup } from 'react-icons/bi';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = ({ onLogout }) => {
    const handleLogout = () => {
        onLogout(); // Call the logout function passed from parent component
    };

    return (
        <div className="menu">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="menu--list">
                <Link to="/dashboard" className="item">
                    <BiHome className="icon" />
                    Dashboard
                </Link>
                <Link to="/services" className="item">
                    <BiSolidHand className="icon" />
                    Interactions
                </Link>
                
                <Link to="/stats" className="item">
                    <BiStats className="icon" />
                    Stats
                </Link>
                <Link to="/customers" className="item">
                    <BiGroup />
                    Customers
                </Link>
                <Link to="/settings" className="item">
                    <SettingsIcon className="icon" />
                    Settings
                </Link>
                <Link to="/logout" className="item" onClick={handleLogout}>
                    <BiLogOut className="icon" />
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;

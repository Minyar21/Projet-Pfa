import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './pages/dashboard/sidebar'; 
import Content from './pages/dashboard/content';
import Profile from './pages/dashboard/profile';
import LoginRegister from './pages/login/loginRegister';
import Services from './pages/services/service';
import Report from './pages/report/report';
import './App.css'; 
import Customers from './pages/customers/customer';
import Stats from './pages/stats/stats';
import EditProfile from './pages/dashboard/edit';
import Settings from './pages/settings/settings';


const DashboardLayout = ({ children, onLogout }) => {
    return (
        <div className="dashboard">
            <Sidebar onLogout={onLogout} />
            <div className='dashboard--content'>
                {children}
            </div>
        </div>
    );
};

const App = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const storedCustomers = localStorage.getItem('customers');
        if (storedCustomers) {
            setCustomers(JSON.parse(storedCustomers));
        }
    }, []);

    const addCustomer = (newCustomer) => {
        const customerWithDate = {
            ...newCustomer,
            createdAt: new Date().toLocaleDateString() 
        };
        const updatedCustomers = [...customers, customerWithDate];
        setCustomers(updatedCustomers);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    };

    const logout = () => {
        // Perform logout actions here
        localStorage.removeItem('token'); // Example: Remove stored token
        return <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/dashboard" element={<DashboardLayout onLogout={logout}><Content /><Profile customers={customers} /></DashboardLayout>} />
                <Route path="/services" element={<DashboardLayout onLogout={logout}><Services /></DashboardLayout>} />
                <Route path="/report" element={<DashboardLayout onLogout={logout}><Report /></DashboardLayout>} />
                <Route path="/customers" element={<DashboardLayout onLogout={logout}><Customers customers={customers} /></DashboardLayout>} />
                <Route path="/stats" element={<DashboardLayout onLogout={logout}><Stats /></DashboardLayout>} />
                <Route path="/edit" element={<DashboardLayout onLogout={logout}><EditProfile addCustomer={addCustomer} customers={customers} /></DashboardLayout>} />
                <Route path="/settings" element={<DashboardLayout onLogout={logout}><Settings /></DashboardLayout>} />
                <Route path="/logout" element={<Navigate to="/login" />} /> {/* Optional: Redirect to login after logout */}
            </Routes>
        </Router>
    );
};

export default App;

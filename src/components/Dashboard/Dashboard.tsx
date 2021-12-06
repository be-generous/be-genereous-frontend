import React from 'react';
import { useDispatch } from 'react-redux';
import { logUserOut } from '../../redux/auth/slices/authSlice';
import { ButtonPrimary } from '../common/Buttons.css';
import Navbar from '../Navbar/Navbar';
import CreditCard from '../common/CreditCard';

const Dashboard = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Navbar />
        </div>
    );
};

export default Dashboard;

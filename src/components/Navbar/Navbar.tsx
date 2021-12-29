import React from 'react';
import { ButtonDefault } from '../common/Buttons.css';
import { NavbarContainer } from './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { logUserOut } from '../../redux/auth/slices/authSlice';

const Navbar = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const activeRoute = window.location.pathname;
    return (
        <NavbarContainer>
            <Link to="/dashboard">
                <p className="title">Be Generous</p>
            </Link>
            <ul className="nav-menu">
                <Link to="/dashboard">
                    <li className={`nav-menu-item ${activeRoute === '/dashboard' ? 'active' : ''}`}>Dashboard</li>
                </Link>
                <Link to="/charities">
                    <li className={`nav-menu-item ${activeRoute === '/charities' ? 'active' : ''}`}>Charities</li>
                </Link>
                <Link to="/profile">
                    <li className={`nav-menu-item ${activeRoute === '/profile' ? 'active' : ''}`}>Profile</li>
                </Link>
                <Link to="/my_charities">
                    <li className={`nav-menu-item ${activeRoute === '/my_charities' ? 'active' : ''}`}>My charities</li>
                </Link>
                <li>
                    <ButtonDefault
                        variant="outlined"
                        onClick={() => {
                            dispatch(logUserOut());
                        }}
                    >
                        Log out
                    </ButtonDefault>
                </li>
            </ul>
        </NavbarContainer>
    );
};

export default Navbar;

import React, { useEffect } from 'react';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch as useAppDispatch } from 'react-redux';
import { logUserOut } from '../redux/auth/slices/authSlice';

const App = () => {
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(logUserOut());
    // }, []);

    return (
        <Router>
            <div id="app-container">
                <Routes />
            </div>
        </Router>
    );
};

export default App;

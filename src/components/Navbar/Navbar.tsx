import React from 'react';
import { ButtonDefault } from '../common/Buttons.css';
import { NavbarContainer } from './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import BeGenerousAPI from '../../api/BeGenerousAPI';
import { logUserOut } from '../../redux/auth/slices/authSlice';

const Navbar = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    return (
        <NavbarContainer>
            <p style={{ fontSize: 30, fontWeight: 'bold' }}>Be Generous</p>
            <ButtonDefault
                variant="outlined"
                onClick={async () => {
                    try {
                        const response = await BeGenerousAPI.getUser(token, 402);
                        console.log(response);
                    } catch (e) {
                        console.error(e);
                    }
                }}
            >
                Get User
            </ButtonDefault>
            <ButtonDefault variant="outlined">Get Charities</ButtonDefault>
            <ButtonDefault variant="outlined">Get Credit card</ButtonDefault>
            <ButtonDefault variant="outlined">Donate</ButtonDefault>
            <ButtonDefault variant="outlined" onClick={() => dispatch(logUserOut())}>
                Log out
            </ButtonDefault>
        </NavbarContainer>
    );
};

export default Navbar;

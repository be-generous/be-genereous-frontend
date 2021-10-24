import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logUserIn, logUserOut } from '../../redux/auth/slices/authSlice';
import { LoginContainer } from './Login.css';
import { CircularProgress } from '@mui/material';
import TextInput from '../common/TextInput';
import { ButtonDefault, ButtonPrimary } from '../common/Buttons.css';
import { ArrowForward } from '@mui/icons-material';

import InlineSVG from 'react-inlinesvg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    return (
        <LoginContainer>
            <div className="login-box">
                <p className="title">Be Generous</p>
                <TextInput
                    type="text"
                    label="E-mail"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <TextInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                {error && <span className="error">{error}</span>}
                <div className="buttons">
                    <ButtonDefault variant="outlined">Register</ButtonDefault>
                    <ButtonPrimary variant="contained" onClick={() => setError('Wrong username or password!')}>
                        Login &nbsp;
                        <ArrowForward />
                    </ButtonPrimary>
                </div>
            </div>
        </LoginContainer>
    );
};

export default Login;

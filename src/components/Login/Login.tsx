import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logUserIn } from '../../redux/auth/slices/authSlice';
import { LoginContainer } from './Login.css';
import TextInput from '../common/TextInput';
import { ButtonDefault, ButtonPrimary } from '../common/Buttons.css';
import { ArrowForward } from '@mui/icons-material';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const dispatch = useDispatch();
    const { errMessage } = useSelector((state: RootState) => state.auth);
    const history = useHistory();

    const handleLoginClick = async (evt: any) => {
        let newErrors = { ...errors };
        if (!email) {
            newErrors.email = 'Please type in your email';
        }
        if (!password) {
            newErrors.password = 'Please type in your password';
        }
        if (Object.keys(newErrors).length) return setErrors(newErrors);
        try {
            await dispatch(logUserIn({ email, password }));
            history.push('/dashboard');
        } catch (e) {
            console.error(e);
        }
    };
    const clearError = (field: string) => {
        setErrors((errors: any) => {
            let newErrors = { ...errors };
            delete newErrors[field];
            return newErrors;
        });
    };
    return (
        <LoginContainer>
            <div className="login-box">
                <p className="title">Be Generous</p>
                <TextInput
                    type="text"
                    label="E-mail"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        clearError('email');
                        setEmail(e.target.value);
                    }}
                    error={errors.email}
                />
                <TextInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        clearError('password');
                        setPassword(e.target.value);
                    }}
                    error={errors.password}
                />
                {errMessage && <span className="login-error">{errMessage}</span>}
                <div className="buttons">
                    <ButtonDefault variant="outlined" onClick={() => history.push('/register')}>
                        Register
                    </ButtonDefault>
                    <ButtonPrimary variant="contained" onClick={handleLoginClick}>
                        Login &nbsp;
                        <ArrowForward />
                    </ButtonPrimary>
                </div>
            </div>
        </LoginContainer>
    );
};

export default Login;

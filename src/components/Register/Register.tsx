import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterContainer } from './Register.css';
import TextInput from '../common/TextInput';
import { ButtonDefault, ButtonPrimary } from '../common/Buttons.css';
import { ArrowBack } from '@mui/icons-material';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router-dom';
import { testEmail, testPassword } from '../../utils/utils';
import BeGenerousAPI from '../../api/BeGenerousAPI';

const Register = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
    const dispatch = useDispatch();
    const { errMessage } = useSelector((state: RootState) => state.auth);
    const history = useHistory();

    const handleRegisterClick = async (evt: any) => {
        let newErrors = { ...errors };
        if (!testEmail(email)) {
            newErrors.email = 'This is not a valid email';
        }
        if (!email) {
            newErrors.email = 'Please type in an email';
        }
        if (!fullName) {
            newErrors.fullName = 'Please provide a full name longer than 3 characters';
        }
        if (!testPassword(password)) {
            newErrors.password =
                'Bad password format: minimum length 6 characters, must contain one capital letter and one lowercase letter';
            return setErrors(newErrors);
        }
        if (!password || !confirmPassword) {
            newErrors.password = 'Please type in a password';
            return setErrors(newErrors);
        }
        if (password !== confirmPassword) {
            newErrors.password = 'The passwords do not match!';
        }
        if (Object.keys(newErrors).length) return setErrors(newErrors);

        try {
            const response = await BeGenerousAPI.register(email, password, fullName);
            history.push('/login');
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
        <RegisterContainer>
            <div className="register-box">
                <div className="title">
                    <p>Create your</p>
                    <p className="title">Be Generous</p>
                    <p>account</p>
                </div>
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
                    type="text"
                    label="Full name"
                    value={fullName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        clearError('fullName');
                        setFullName(e.target.value);
                    }}
                    error={errors.fullName}
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
                <TextInput
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        clearError('password');
                        setConfirmPassword(e.target.value);
                    }}
                    error={errors.password}
                />
                {errMessage && <span className="login-error">{errMessage}</span>}
                <div className="buttons">
                    <ButtonDefault variant="outlined" onClick={() => history.push('/login')}>
                        <ArrowBack /> &nbsp; Back to Login
                    </ButtonDefault>
                    <ButtonPrimary variant="contained" onClick={handleRegisterClick}>
                        Register
                    </ButtonPrimary>
                </div>
            </div>
        </RegisterContainer>
    );
};

export default Register;

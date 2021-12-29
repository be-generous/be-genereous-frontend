import React, { ChangeEvent, useEffect, useState } from 'react';
import { ProfileContainer } from './Profile.css';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import BeGenerousAPI from '../../api/BeGenerousAPI';
import TextInput from '../common/TextInput';
import { ButtonDefault, ButtonPrimary } from '../common/Buttons.css';
import { testEmail, testPassword } from '../../utils/utils';
import CreditCard from '../common/CreditCard';
import AddCreditCardModal from './AddCreditCardModal';

export const placeholderImage = 'https://i.picsum.photos/id/9/300/300.jpg?hmac=Zf_elnyFDTPzb9nUe7m1J5g080C689yQsh3U8_DhHWE';

const Profile = () => {
    const { token, id } = useSelector((state: RootState) => state.auth);
    const [profileURL, setProfileURL] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(false);
    const [newProfileURL, setNewProfileURL] = useState<string>('');
    const [creditCards, setCreditCards] = useState<any>([]);
    const [openAddCreditCardModal, setOpenAddCreditCardModal] = useState<boolean>(false);

    useEffect(() => {
        loadUser();
    }, [token, id]);

    const loadUser = async () => {
        try {
            const userResponse: any = await BeGenerousAPI.getUser(token, id);
            setProfileURL(userResponse.avatarURL);
            setFullName(userResponse.fullName);
            setEmail(userResponse.email);
            const cardsResponse: any = await BeGenerousAPI.getCreditCards(token, id);
            setCreditCards(cardsResponse);
        } catch (ex) {
            console.error(ex);
        }
    };

    const fetchImage = async () => {
        setFetching(true);
        try {
            const resp = await fetch('https://picsum.photos/300/300');
            setNewProfileURL(resp.url);
            setFetching(false);
        } catch (e) {
            console.error(e);
            setFetching(false);
        }
    };
    const onSaveChanges = async () => {
        let newErrors = { ...errors };
        if (password || confirmPassword) {
            if (!password || !confirmPassword) {
                newErrors.password = 'Please type in a password';
                return setErrors(newErrors);
            }
            if (password !== confirmPassword) {
                newErrors.password = 'The passwords do not match!';
            }
        }
        if (!testEmail(email)) {
            newErrors.email = 'This is not a valid email';
        }
        if (!email) {
            newErrors.email = 'Please type in an email';
        }
        if (!fullName) {
            newErrors.fullName = 'Please provide a full name longer than 3 characters';
        }
        if (Object.keys(newErrors).length) return setErrors(newErrors);

        let newData: any = {
            email: email,
            fullName: fullName,
            avatarURL: profileURL
        };
        if (password) newData['password'] = password;
        if (newProfileURL) newData.avatarURL = newProfileURL;

        try {
            setFetching(true);
            const response = await BeGenerousAPI.updateUser(token, id, newData);
            setFetching(false);
        } catch (ex) {
            console.error(ex);
        }
    };

    const renderCreditCards = () => {
        return creditCards.map((creditCard: any, index: number) => (
            <CreditCard key={index} cardHolder={creditCard.name} cardNumber={creditCard.cardNumber} balance={creditCard.balance} />
        ));
    };

    const clearError = (field: string) => {
        setErrors((errors: any) => {
            let newErrors = { ...errors };
            delete newErrors[field];
            return newErrors;
        });
    };
    return (
        <ProfileContainer>
            <Navbar />
            <div className="profile-content">
                <img
                    src={newProfileURL ? newProfileURL : profileURL ? profileURL : placeholderImage}
                    className="profile-image"
                    alt="profile image"
                />
                <div className="fetch-buttons">
                    <ButtonPrimary variant="contained" disabled={fetching} onClick={() => fetchImage()}>
                        Change Avatar
                    </ButtonPrimary>
                    <ButtonDefault variant="outlined" disabled={fetching} onClick={() => setNewProfileURL('')}>
                        Reset Avatar
                    </ButtonDefault>
                </div>
                <TextInput
                    type="text"
                    value={fullName}
                    label="Full name"
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        setFullName(evt.target.value);
                        clearError('fullName');
                    }}
                    error={errors.fullName}
                />
                <TextInput
                    type="text"
                    value={email}
                    label="Email"
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        setEmail(evt.target.value);
                        clearError('email');
                    }}
                    error={errors.email}
                />
                <TextInput
                    type="password"
                    value={password}
                    label="New Password"
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        setPassword(evt.target.value);
                        clearError('password');
                    }}
                    error={errors.password}
                />
                <TextInput
                    type="password"
                    value={confirmPassword}
                    label="Confirm new Password"
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        setConfirmPassword(evt.target.value);
                        clearError('password');
                    }}
                    error={errors.password}
                />
                <ButtonPrimary variant="contained" disabled={fetching} onClick={() => onSaveChanges()}>
                    Save Changes
                </ButtonPrimary>
                <h1>Credit cards</h1>
                <ButtonPrimary variant="contained" onClick={() => setOpenAddCreditCardModal(true)}>
                    Add Credit Card
                </ButtonPrimary>
                {creditCards.length ? renderCreditCards() : 'No Credit Card Added'}
            </div>
            <AddCreditCardModal
                open={openAddCreditCardModal}
                onClose={() => {
                    loadUser();
                    setOpenAddCreditCardModal(false);
                }}
            />
        </ProfileContainer>
    );
};

export default Profile;

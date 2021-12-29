import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style/constants';
import BeGenerousAPI from '../../api/BeGenerousAPI';
import { placeholderImage } from '../Profile/Profile';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export interface IDonationCard {
    message: string;
    date: number;
    amount: number;
    userId: number;
}
const DonationCard: FC<IDonationCard> = ({ message, date, amount, userId }) => {
    const [fullName, setFullName] = useState<string>('');
    const [profileURL, setProfileURL] = useState<string>('');
    const { token, id } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        loadUser();
    });
    const loadUser = async () => {
        try {
            const userResponse: any = await BeGenerousAPI.getUser(token, id);
            setProfileURL(userResponse.avatarURL);
            setFullName(userResponse.fullName);
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <DonationCardWrapper>
            <div className="donator-name">
                <img width={40} height={40} src={profileURL ? profileURL : placeholderImage} />
                {fullName}
            </div>
            <div>{message}</div>
            <h3>{amount}&nbsp;BGC</h3>
            <div className="date">{new Date(date * 1000).toDateString()}</div>
        </DonationCardWrapper>
    );
};

export default DonationCard;

const DonationCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    height: fit-content;
    box-shadow: 0 0 8px -3px ${COLORS.primary.light};
    border-radius: 15px;
    .date {
        color: ${COLORS.primary.light};
        text-align: right;
        padding: 10px;
        font-style: italic;
    }
    .donator-name {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        font-weight: 700;
        img {
            border-radius: 50%;
        }
    }
`;

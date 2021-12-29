import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style/constants';
import BeGenerousAPI from '../../api/BeGenerousAPI';

export interface IDonationCard {
    message: string;
    date: number;
    amount: number;
    creditCardId: number;
}
const DonationCard: FC<IDonationCard> = ({ message, date, amount, creditCardId }) => {
    const [fullName, setFullName] = useState<string>('');
    useEffect(() => {
        setFullName('Anonymous Donation');
    });

    return (
        <DonationCardWrapper>
            <div>
                <b>From:&nbsp;</b>
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
`;

import React, { FC } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style/constants';

interface ICreditCard {
    cardHolder: string;
    cardNumber: string;
    balance: number;
}
const CreditCard: FC<ICreditCard> = ({ cardHolder, cardNumber, balance }) => {
    return (
        <CreditCardContainer>
            <div className="card-holder">{cardHolder}</div>
            <div className="card-number">{cardNumber}</div>
            <div className="card-balance">Available balance: {balance} BGC</div>
        </CreditCardContainer>
    );
};

export default CreditCard;

const CreditCardContainer = styled.div`
    width: 324px;
    height: 190px;
    border-radius: 9px;
    background: ${COLORS.primary.light};
    background: linear-gradient(0deg, ${COLORS.primary.light} 0%, ${COLORS.primary.dark} 100%);
    position: relative;
    color: ${COLORS.white};
    font-weight: bold;
    .card-holder {
        position: absolute;
        bottom: 20px;
        left: 20px;
        letter-spacing: 4px;
    }
    .card-number {
        position: absolute;
        letter-spacing: 5px;
        right: 20px;
        bottom: 70px;
    }
    .card-balance {
        position: absolute;
        top: 30px;
        left: 20px;
        letter-spacing: 4px;
    }
`;

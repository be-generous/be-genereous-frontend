import React, { FC } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style/constants';

interface ICreditCard {
    cardHolder: string;
    cardNumber: string;
}
const CreditCard: FC<ICreditCard> = ({ cardHolder, cardNumber }) => {
    return (
        <CreditCardContainer>
            <div className="card-holder">{cardHolder}</div>
            <div className="card-number">{cardNumber}</div>
        </CreditCardContainer>
    );
};

export default CreditCard;

const CreditCardContainer = styled.div`
    width: 324px;
    height: 225px;
    border-radius: 9px;
    background-color: ${COLORS.primary.dark};
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
        bottom: 60px;
    }
`;

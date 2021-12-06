import React, { FC } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style/constants';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

interface ICharityCard {
    goalAmount: number;
    currentAmount: number;
    coverImageURL: string;
    title: string;
    description: string;
    dateCreated: number;
}
const CharityCard: FC<ICharityCard> = ({ goalAmount, currentAmount, coverImageURL, title, description, dateCreated }) => {
    const progressValue = Math.round((currentAmount / goalAmount) * 100);
    return (
        <CharityCardContainer>
            <div className="image-container">
                <img src="https://i.picsum.photos/id/885/500/200.jpg?hmac=m3p6BoT2MQmQqxEp7dBQku5oUw7y2RCiEOrA3LuKa3c" />
            </div>
            <div className="title">{title}</div>
            <div className="description">
                <p>{description}</p>
            </div>
            <div className="date">{new Date(dateCreated * 1000).toDateString()}</div>
            <div className="goal">
                <Progress
                    percent={progressValue >= 100 ? 100 : progressValue}
                    status={progressValue >= 100 ? 'success' : 'error'}
                    theme={{ error: { color: COLORS.primary.light }, success: { color: COLORS.primary.main } }}
                />
                <div className="goal-amounts">
                    <div>{currentAmount}&nbsp;BGC</div>
                    <div>{goalAmount}&nbsp;BGC</div>
                </div>
            </div>
        </CharityCardContainer>
    );
};

export default CharityCard;

const CharityCardContainer = styled.div`
    &:hover {
        transform: scale(1.01);
    }
    height: 430px;
    width: 400px;
    border-radius: 5px;
    background-color: ${COLORS.white};
    color: ${COLORS.primary.dark};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    transition: all 200ms linear;
    //border: 1px solid ${COLORS.primary.light};
    box-shadow: 0 0 15px -3px ${COLORS.primary.light};
    .image-container {
        img {
            width: 100%;
            height: 200px;
        }
    }
    .title {
        padding: 10px;
        font-size: 20px;
        font-weight: bolder;
        color: ${COLORS.primary.dark};
    }
    .description {
        background-color: white;
        color: #000;
        padding: 10px;
        height: 70px;
        p {
            padding: 0;
            margin: 0;
            text-overflow: ellipsis;
            overflow-x: hidden;
            overflow-y: scroll;
            height: 70px;
        }
        p::-webkit-scrollbar {
            width: 3px;
        }
        p::-webkit-scrollbar-thumb {
            background-color: ${COLORS.primary.light};
        }
    }
    .goal {
        padding: 10px;
        .react-sweet-progress-symbol {
            display: none;
        }
        display: flex;
        flex-direction: column;
        gap: 5px;
        height: 100%;
        .goal-amounts {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 500;
        }
    }
    .date {
        text-align: right;
        padding: 10px;
        font-style: italic;
    }
`;

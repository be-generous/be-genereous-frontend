import React from 'react';
import { useDispatch } from 'react-redux';
import githubLogo from '../style/github.png';
import Navbar from '../Navbar/Navbar';
import styled from 'styled-components';
import { COLORS } from '../style/constants';
import InlineSVG from 'react-inlinesvg';

const Dashboard = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Navbar />
            <DashboardContainer>
                <div className="title">
                    <p>BE</p>
                    <p>GENEROUS</p>
                </div>
                <div className="description">
                    The purpose of this application is to provide a way for people to help out each other, by giving money to the ones in
                    need
                </div>
                <h1>Development</h1>
                <div>The app was developed by two students:</div>
                <ul>
                    <li>
                        <a href="https://github.com/KecskesDavid" target="_blank" rel="noreferrer">
                            <img src={githubLogo} />
                            Kecskés Dávid
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/fulopzoltan" target="_blank" rel="noreferrer">
                            <img src={githubLogo} />
                            Fülöp Zoltán
                        </a>
                    </li>
                </ul>
            </DashboardContainer>
        </div>
    );
};
export default Dashboard;

const DashboardContainer = styled.div`
    margin-left: 50%;
    transform: translateX(-50%);
    width: 600px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .title {
        font-weight: 700;
        color: ${COLORS.primary.main};
        p {
            font-size: 100px;
        }
    }
    .description {
        font-size: 30px;
        font-weight: lighter;
    }
    h1 {
        font-size: 24px;
    }
    ul li,
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        margin: 10px;
        color: #000;
        img {
            width: 20px;
            height: 20px;
        }
    }
`;

import styled from 'styled-components';
import { COLORS } from '../style/constants';

export const CharityDetailContainer = styled.div`
    .detail-content {
        margin-left: 50%;
        width: 500px;
        padding: 50px;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        gap: 20px;
        .image-container {
            align-self: center;
        }
        .action-buttons {
            align-self: center;
            display: flex;
            flex-direction: row;
            gap: 20px;
        }
        .owner-name {
            padding: 10px;
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
            p {
                padding: 0;
                margin: 0;
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

        .detail-messages {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px;
            input[type='text'] {
                width: 100%;
            }
        }
    }
`;

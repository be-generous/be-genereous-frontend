import styled from 'styled-components';

export const CharitiesContainer = styled.div`
    .content-container {
        display: flex;
        flex-direction: column;
    }
    .charities-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .actions-container {
        display: flex;
        justify-content: center;
        padding: 20px;
        button {
            width: fit-content;
        }
    }
`;

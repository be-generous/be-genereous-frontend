import styled from 'styled-components';

export const ProfileContainer = styled.div`
    .profile-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-left: 50%;
        transform: translateX(-50%);
        width: 500px;
        .fetch-buttons {
            display: flex;
            flex-direction: row;
            gap: 10px;
            justify-content: center;
            align-items: center;
        }
        .profile-image {
            width: 300px;
            height: 300px;
            border-radius: 50%;
        }
        .profile-name {
            font-size: 40px;
            font-weight: 700;
            text-align: center;
        }
    }
`;

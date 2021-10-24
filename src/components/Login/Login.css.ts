import styled from 'styled-components';
import { COLORS } from '../style/constants';

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(${COLORS.primary.dark}, ${COLORS.primary.light});
    .login-box {
        background-color: ${COLORS.white};
        .title {
            font-size: 24px;
            font-weight: 700;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 30px;
        width: 400px;
        height: fit-content;
        padding: 30px;
        box-shadow: 0 0 30px -10px #000;
        border-radius: 10px;
        .buttons {
            display: flex;
            gap: 20px;
        }
        span.error {
            color: ${COLORS.error.main};
            font-weight: bold;
        }
    }
`;

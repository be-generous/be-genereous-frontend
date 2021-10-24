import styled from 'styled-components';
import { COLORS } from '../style/constants';
import { loginBackground } from '../style/svg';

export const LoginContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url(${loginBackground});
    .login-box {
        background-color: ${COLORS.white};
        .title {
            font-size: 40px;
            font-weight: 700;
            color: white;
            text-shadow: 2px 2px 0 ${COLORS.primary.dark};
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: ${COLORS.primary.dark};
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

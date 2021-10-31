import styled from 'styled-components';
import { COLORS } from '../style/constants';
import { loginBackground } from '../style/svg';

export const RegisterContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;

    &:before {
        content: '';
        background: url(${loginBackground}) 0 0 repeat;
        position: absolute;
        width: 400%;
        height: 400%;
        top: -150%;
        left: -150%;
        z-index: -1;
        animation: rotate 100s linear infinite;
    }

    .register-box {
        background-color: ${COLORS.white};

        p {
            font-size: 40px;
            font-weight: 700;
            &.title {
                color: white;
                text-shadow: 2px 2px 0 ${COLORS.primary.dark};
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: ${COLORS.primary.dark};
            }
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

        .login-error {
            max-width: 400px;
            color: ${COLORS.error.main};
            font-weight: bold;
            border: 1px solid ${COLORS.error.main};
            padding: 10px;
            border-radius: 5px;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

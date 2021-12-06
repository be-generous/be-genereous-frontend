import styled from 'styled-components';
import { COLORS } from '../style/constants';

export const NavbarContainer = styled.div`
    height: 80px;
    background-color: ${COLORS.primary.light};
    color: ${COLORS.white};
    max-width: 100vw;
    padding: 0 30px;
    box-shadow: 0 0 10px 0 #000;
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        color: ${COLORS.white};
    }
    .title {
        font-size: 30px;
        font-weight: bold;
    }
    .nav-menu {
        margin-left: auto;
        list-style: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 40px;
        .nav-menu-item {
            box-sizing: content-box;
            font-size: 20px;
            font-weight: bolder;
            color: ${COLORS.white};
            &:hover {
                cursor: pointer;
                border-bottom: 2px solid white;
            }
            &.active {
                border-bottom: 2px solid white;
            }
        }
        li > button {
            width: fit-content;
        }
    }
`;

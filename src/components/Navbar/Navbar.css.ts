import styled from 'styled-components';
import { COLORS } from '../style/constants';

export const NavbarContainer = styled.div`
    height: 80px;
    background-color: ${COLORS.primary.light};
    color: ${COLORS.white};
    width: 100%;
    padding: 0 30px;
    box-shadow: 0 0 10px 0 #000;
    display: flex;
    align-items: center;
    gap: 20px;
`;

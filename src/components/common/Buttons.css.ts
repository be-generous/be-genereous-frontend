import { Button, styled } from '@mui/material';
import { COLORS } from '../style/constants';

export const ButtonPrimary = styled(Button)`
    width: 120px;
    height: 40px;
    background-color: ${COLORS.primary.light};
    &:hover {
        background-color: ${COLORS.primary.dark};
    }
`;
export const ButtonDefault = styled(Button)`
    width: 120px;
    min-width: fit-content;
    color: ${COLORS.primary.light};
    border-color: ${COLORS.primary.light};
    background-color: ${COLORS.white};
    &:hover {
        border-color: ${COLORS.primary.light};
        background-color: #ebebeb;
    }
`;

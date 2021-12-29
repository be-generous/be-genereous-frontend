import { Button, styled } from '@mui/material';
import { COLORS } from '../style/constants';

export const ButtonPrimary = styled(Button)`
    width: 120px;
    height: 40px;
    min-width: fit-content;
    background-color: ${COLORS.primary.light};
    &:hover {
        background-color: ${COLORS.primary.dark};
    }
    &.button-delete {
        border-color: ${COLORS.error.main};
        background-color: ${COLORS.error.main};
        &:hover {
            background-color: ${COLORS.error.dark};
        }
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

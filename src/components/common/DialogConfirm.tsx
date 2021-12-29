import React, { FC } from 'react';
import BgModal from './BGModal';
import { ButtonDefault, ButtonPrimary } from './Buttons.css';

const DialogConfirm: FC<{ open: boolean; onNegative: any; onPositive: any; title: string; message: string }> = ({
    open,
    onNegative,
    onPositive,
    title,
    message
}) => {
    return (
        <BgModal onClose={() => onNegative} open={open}>
            <h1>{title}</h1>
            <div className="dialog-confirm-message">{message}</div>
            <div className="dialog-confirm-actions">
                <ButtonDefault variant="outlined" onClick={() => onNegative()}>
                    NO
                </ButtonDefault>
                <ButtonPrimary variant="contained" onClick={() => onPositive}>
                    YES
                </ButtonPrimary>
            </div>
        </BgModal>
    );
};

export default DialogConfirm;

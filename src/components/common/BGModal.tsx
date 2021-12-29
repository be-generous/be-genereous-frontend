import React, { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const BgModal: FC<{ open: boolean; onClose: any }> = ({ open, onClose, children }) => {
    return (
        <Modal className="bg-modal" isOpen={open} onRequestClose={() => onClose()}>
            <div className="bg-modal-upper">
                <div className="close-icon" onClick={() => onClose()}>
                    <CloseIcon />
                </div>
            </div>
            <div className="bg-modal-content">{children}</div>
        </Modal>
    );
};
export default BgModal;

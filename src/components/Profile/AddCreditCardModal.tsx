import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import BgModal from '../common/BGModal';
import TextInput from '../common/TextInput';
import { ButtonDefault, ButtonPrimary } from '../common/Buttons.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { formatCardNumber } from '../../utils/utils';
import BeGenerousAPI from '../../api/BeGenerousAPI';

const AddCreditCardModal: FC<{ open: boolean; onClose: any }> = ({ open, onClose }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [fetching, setFetching] = useState(false);
    const [name, setName] = useState('');
    const [cvv, setCvv] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [errors, setErrors] = useState<{ cardNumber?: string; name?: string; cvv?: string; expireDate?: string }>({});

    const { token, id } = useSelector((state: RootState) => state.auth);

    const onSave = async () => {
        let newErrors: any = {};
        if (!name) {
            newErrors['name'] = 'Please enter a name';
        }
        if (!cvv || cvv.length !== 3) {
            newErrors['cvv'] = 'Please enter a cvv';
        }
        if (!cardNumber || cardNumber.length !== 19) {
            newErrors['cardNumber'] = 'Please enter a card number';
        }
        if (!expireDate) {
            newErrors['expireDate'] = 'Please select an expiration date';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        try {
            const creditCard = {
                cardNumber: cardNumber,
                name: name,
                cvv: cvv,
                expireDate: expireDate,
                userId: id
            };
            const resp = await BeGenerousAPI.addCreditCard(token, creditCard);
            document.location.reload();
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <BgModal
            open={open}
            onClose={() => {
                setName('');
                setCvv('');
                setExpireDate('');
                setCardNumber('');
                setErrors({});
                onClose();
            }}
        >
            <h1>ADD A NEW CREDIT CARD</h1>
            <TextInput
                type="text"
                label="Cardholder Name"
                error={errors?.name}
                value={name}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['name'];
                        return newErrors;
                    });
                    setName(evt.target.value.replace(/[0-9]/, ''));
                }}
            />
            <TextInput
                type="text"
                label="Card Number"
                error={errors?.cardNumber}
                value={cardNumber}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['cardNumber'];
                        return newErrors;
                    });
                    if (evt.target.value.length > 19) return;
                    setCardNumber(formatCardNumber(evt.target.value));
                }}
            />
            <TextInput
                type="text"
                label="CVV"
                error={errors?.cvv}
                value={cvv}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    let val = evt.target.value.replace(/[^0-9]/, '');
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['cvv'];
                        return newErrors;
                    });
                    if (evt.target.value.length > 3) return;
                    setCvv(evt.target.value.replace(/[^0-9]/, ''));
                }}
            />
            <TextInput
                type="date"
                label="Expire Date"
                value={expireDate}
                onChange={(newVal: any) => setExpireDate(newVal.target.value)}
                error={errors.expireDate}
            />
            <ButtonPrimary variant="contained" onClick={onSave} style={{ alignSelf: 'center' }} disabled={fetching}>
                Add Credit Card
            </ButtonPrimary>
        </BgModal>
    );
};

export default AddCreditCardModal;

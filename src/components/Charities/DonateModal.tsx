import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import BgModal from '../common/BGModal';
import TextInput from '../common/TextInput';
import { ButtonPrimary } from '../common/Buttons.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import BeGenerousAPI from '../../api/BeGenerousAPI';
import CreditCard from '../common/CreditCard';

const DonateModal: FC<{ open: boolean; onClose: any; charityId: number }> = ({ open, onClose, charityId }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [creditCard, setCreditCard] = useState<number | null>(null);
    const [creditCards, setCreditCards] = useState<any>([]);

    const [errors, setErrors] = useState<{ amount?: string; message?: string; creditCard?: string }>({});
    const { token, id } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        loadCards();
    }, []);
    const loadCards = async () => {
        try {
            const cardsResponse: any = await BeGenerousAPI.getCreditCards(token, id);
            setCreditCards(cardsResponse);
        } catch (ex) {
            console.error(ex);
        }
    };

    const renderCreditCardOptions = () => {
        return creditCards.map((creditCard: any, index: number) => (
            <div key={index} className="credit-card-option">
                <input
                    type="radio"
                    id={creditCard.name}
                    name="creditCard"
                    value={creditCard.id}
                    onChange={() => {
                        setErrors((prevErrors) => {
                            let newErrors = { ...prevErrors };
                            delete newErrors['creditCard'];
                            return newErrors;
                        });
                        setCreditCard(creditCard.creditCardId);
                    }}
                />
                <label htmlFor={creditCard.name}>
                    <CreditCard cardHolder={creditCard.name} cardNumber={creditCard.cardNumber} balance={creditCard.balance} />
                </label>
            </div>
        ));
    };

    const onSave = async () => {
        let newErrors: any = {};
        if (!amount) {
            newErrors['amount'] = 'Please enter an amount';
        }
        if (!message) {
            newErrors['message'] = 'Please enter a message';
        }
        if (!creditCard) {
            newErrors['creditCard'] = 'Please chose a credit card';
        }
        if (amount || creditCard) {
            const availableAmount = creditCards.filter((cc: any) => cc.creditCardId == creditCard)[0].balance;
            if (availableAmount < amount) {
                newErrors['creditCard'] = 'Donation amount is higher than available amount';
            }
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        try {
            const donation: any = {
                amount: amount,
                message: message,
                creditCardId: creditCard,
                charityId: charityId
            };
            const resp = await BeGenerousAPI.donate(token, donation);
            onClose();
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <BgModal
            open={open}
            onClose={() => {
                setAmount('');
                setMessage('');
                setCreditCard(null);
                setErrors({});
                onClose();
            }}
        >
            <h1>DONATE</h1>
            <TextInput
                type="text"
                label="Amount"
                error={errors?.amount}
                value={amount}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['amount'];
                        return newErrors;
                    });
                    setAmount(evt.target.value.replace(/[^0-9]/, ''));
                }}
            />
            <TextInput
                type="text"
                label="Message"
                error={errors?.message}
                value={message}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['message'];
                        return newErrors;
                    });
                    setMessage(evt.target.value);
                }}
            />
            {renderCreditCardOptions()}
            {errors.creditCard ? <span className="credit-card-error">{errors.creditCard}</span> : ''}
            <ButtonPrimary variant="contained" onClick={onSave} style={{ alignSelf: 'center' }}>
                Donate
            </ButtonPrimary>
        </BgModal>
    );
};

export default DonateModal;

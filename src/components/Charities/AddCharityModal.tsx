import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import BgModal from '../common/BGModal';
import TextInput from '../common/TextInput';
import { ButtonDefault, ButtonPrimary } from '../common/Buttons.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import BeGenerousAPI, { Charity } from '../../api/BeGenerousAPI';

const AddCharityModal: FC<{ open: boolean; onClose: any; charityEdit?: any }> = ({ open, onClose, charityEdit }) => {
    const [imageURL, setImageURL] = useState('');
    const [fetching, setFetching] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [errors, setErrors] = useState<{ title?: string; desc?: string; goalAmount?: string }>({});

    const { token, id } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (charityEdit) {
            setTitle(charityEdit.title);
            setDescription(charityEdit.description);
            setGoalAmount(charityEdit.goalAmount);
            setImageURL(charityEdit.coverImageURL);
        } else {
            fetchImage();
        }
    }, [charityEdit]);

    const fetchImage = async () => {
        setFetching(true);
        try {
            const resp = await fetch('https://picsum.photos/500/200');
            setImageURL(resp.url);
            setFetching(false);
        } catch (e) {
            console.error(e);
            setFetching(false);
        }
    };

    const onSave = async () => {
        let newErrors: any = {};
        if (!title) {
            newErrors['title'] = 'Please enter a title';
        }
        if (!description) {
            newErrors['desc'] = 'Please enter a description';
        }
        if (!goalAmount) {
            newErrors['goalAmount'] = 'Please enter a goalAmount';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        try {
            let charity: Charity = {
                charityId: 0,
                goalAmount: parseInt(goalAmount),
                currentAmount: 0,
                coverImageURL: imageURL,
                title: title,
                description: description,
                dateCreated: Date.now().toString(),
                userId: id
            };
            if (charityEdit) {
                console.log('here, Edit');
                charity.charityId = charityEdit.charityId;
                const resp = await BeGenerousAPI.updateCharity(token, charity);
            } else {
                console.log('here, create');
                const resp = await BeGenerousAPI.createCharity(token, charity);
            }

            onClose();
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <BgModal
            open={open}
            onClose={() => {
                setTitle('');
                setDescription('');
                setGoalAmount('');
                setErrors({});
                onClose();
            }}
        >
            <h1>{charityEdit ? 'EDIT CHARITY' : 'SET UP A NEW CHARITY'}</h1>
            <TextInput
                type="text"
                label="Charity title"
                error={errors?.title}
                value={title}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['title'];
                        return newErrors;
                    });
                    setTitle(evt.target.value.replace(/[0-9]/, ''));
                }}
            />
            <TextInput
                type="text"
                label="Description"
                error={errors?.desc}
                value={description}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['desc'];
                        return newErrors;
                    });
                    setDescription(evt.target.value);
                }}
            />
            <TextInput
                type="text"
                label="Goal amount"
                error={errors?.goalAmount}
                value={goalAmount}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    let val = evt.target.value.replace(/[^0-9]/, '');
                    setErrors((prevErrors) => {
                        let newErrors = { ...prevErrors };
                        delete newErrors['goalAmount'];
                        return newErrors;
                    });
                    setGoalAmount(val !== '0' ? val : '');
                }}
            />
            <h1>COVER IMAGE</h1>
            <img src={imageURL} width={500} height={200} alt="cover-photo" />
            <ButtonDefault variant="outlined" onClick={() => fetchImage()} disabled={fetching}>
                Fetch new cover image
            </ButtonDefault>
            <ButtonPrimary variant="contained" onClick={onSave} style={{ alignSelf: 'center' }} disabled={fetching}>
                {charityEdit ? 'EDIT CHARITY' : 'ADD CHARITY'}
            </ButtonPrimary>
        </BgModal>
    );
};

export default AddCharityModal;

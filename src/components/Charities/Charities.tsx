import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { CharitiesContainer } from './Charities.css';
import BeGenerousAPI from '../../api/BeGenerousAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { charitiesMock } from '../mocks/charitiesMock';
import CharityCard from '../common/CharityCard';
import { ButtonPrimary } from '../common/Buttons.css';
import BgModal from '../common/BGModal';

const Charities = () => {
    const own = window.location.pathname === '/my_charities';
    const { token } = useSelector((state: RootState) => state.auth);
    const [charities, setCharities] = useState<any>([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        loadCharities();
    }, []);

    const loadCharities = async () => {
        try {
            const response = await BeGenerousAPI.getCharities(token);
            setCharities(response);
        } catch (e) {
            console.error(e);
        }
    };

    const renderCharities = () => {
        return charities.map((charity: any) => {
            return (
                <CharityCard
                    key={charity.id}
                    goalAmount={charity.goalAmount}
                    currentAmount={charity.currentAmount}
                    coverImageURL={charity.coverImageURL}
                    title={charity.title}
                    description={charity.description}
                    dateCreated={charity.dateCreated}
                />
            );
        });
    };
    return (
        <CharitiesContainer>
            <Navbar />
            <div className="content-container">
                <div className="actions-container">
                    <ButtonPrimary variant="contained" onClick={() => setOpenCreateModal(true)}>
                        Set up a new charity
                    </ButtonPrimary>
                </div>
                <div className="charities-container">{renderCharities()}</div>
            </div>
        </CharitiesContainer>
    );
};

export default Charities;

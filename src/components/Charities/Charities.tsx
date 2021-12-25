import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { CharitiesContainer } from './Charities.css';
import BeGenerousAPI, { Charity } from '../../api/BeGenerousAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CharityCard from '../common/CharityCard';
import { ButtonPrimary } from '../common/Buttons.css';
import AddCharityModal from './AddCharityModal';

const Charities = () => {
    const own = window.location.pathname === '/my_charities';
    const { token, id } = useSelector((state: RootState) => state.auth);
    const [charities, setCharities] = useState<any>([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        loadCharities();
    }, []);

    const loadCharities = async () => {
        try {
            const response: any = await BeGenerousAPI.getCharities(token);
            let charities: Charity[] = [...response];
            if (own) {
                charities.filter((charitiy) => {
                    return charitiy.userId === id;
                });
            }
            setCharities(charities);
        } catch (e) {
            console.error(e);
        }
    };

    const renderCharities = () => {
        return charities.map((charity: any) => {
            return (
                <CharityCard
                    key={charity.charityId}
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
            <AddCharityModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
        </CharitiesContainer>
    );
};

export default Charities;

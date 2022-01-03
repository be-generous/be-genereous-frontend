import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { CharitiesContainer } from './Charities.css';
import BeGenerousAPI, { Charity } from '../../api/BeGenerousAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CharityCard from '../common/CharityCard';
import { ButtonPrimary } from '../common/Buttons.css';
import AddCharityModal from './AddCharityModal';
import { Link } from 'react-router-dom';

const Charities = () => {
    const own = window.location.pathname === '/my_charities';
    const { token, id } = useSelector((state: RootState) => state.auth);
    const [charities, setCharities] = useState<any>([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        loadCharities();
    }, [own]);

    const loadCharities = async () => {
        try {
            const response: any = await BeGenerousAPI.getCharities(token);
            let charities: Charity[] = [...response];
            if (own) {
                charities = charities.filter((charity) => {
                    return charity.userId == id;
                });
            }
            setCharities(charities);
        } catch (e) {
            console.error(e);
        }
    };

    const renderCharities = () => {
        return charities.map((charity: any, index: number) => {
            return (
                <Link key={charity.index} to={`/charities/${charity.charityId}`}>
                    <CharityCard
                        key={charity.charityId}
                        goalAmount={charity.goalAmount}
                        currentAmount={charity.currentAmount}
                        coverImageURL={charity.coverImageURL}
                        title={charity.title}
                        description={charity.description}
                        dateCreated={charity.dateCreated}
                    />
                </Link>
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
                {charities.length ? (
                    <div className="charities-container">{renderCharities()}</div>
                ) : (
                    <div className="charities-container">There are no charities, go ahead and set up a new one</div>
                )}
            </div>
            <AddCharityModal
                open={openCreateModal}
                onClose={() => {
                    loadCharities();
                    setOpenCreateModal(false);
                }}
            />
        </CharitiesContainer>
    );
};

export default Charities;

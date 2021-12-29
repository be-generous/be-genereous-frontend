import React, { ChangeEvent, useEffect, useState } from 'react';
import { CharityDetailContainer } from './CharityDetail.css';
import Navbar from '../Navbar/Navbar';
import BeGenerousAPI, { Charity } from '../../api/BeGenerousAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ButtonDefault, ButtonPrimary } from '../common/Buttons.css';
import { COLORS } from '../style/constants';
// @ts-ignore
import { Progress } from 'react-sweet-progress';
import TextInput from '../common/TextInput';
import DonationCard from '../common/DonationCard';

const placeholderImg = 'https://i.picsum.photos/id/885/500/200.jpg?hmac=m3p6BoT2MQmQqxEp7dBQku5oUw7y2RCiEOrA3LuKa3c';
const CharityDetail = (props: any) => {
    const [charity, setCharity] = useState<any>({});
    const [own, setOwn] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>('');
    const [progressValue, setProgressValue] = useState<number>(0);
    const [donations, setDonations] = useState<any>([]);
    const { token, id } = useSelector((state: RootState) => state.auth);
    const charityId: number = props.match.params.id;

    useEffect(() => {
        loadCharity();
    }, []);
    const loadCharity = async () => {
        try {
            const response: any = await BeGenerousAPI.getCharities(token);
            let fetchedCharity: Charity = response.filter((charity: Charity) => charity.charityId == charityId)[0];
            if (fetchedCharity.userId == id) {
                setOwn(true);
            }
            setProgressValue(Math.round((fetchedCharity.currentAmount / fetchedCharity.goalAmount) * 100));
            setCharity(fetchedCharity);

            const donationResponse = await BeGenerousAPI.getDonationsByCharity(token, fetchedCharity.charityId);
            setDonations(donationResponse);
            const userResponse: any = await BeGenerousAPI.getUser(token, fetchedCharity.userId);
            setFullName(userResponse.fullName);
        } catch (e) {
            console.error(e);
        }
    };

    const renderDonations = () => {
        const sorted = donations.sort((a: any, b: any) => {
            return a.donationId - b.donationId;
        });
        return donations
            .sort((a: any, b: any) => (a.transactionDate < b.transactionDate ? 1 : -1))
            .map((donation: any, index: number) => (
                <DonationCard
                    key={index}
                    message={donation.message}
                    date={donation.transactionDate}
                    amount={donation.amount}
                    creditCardId={donation.creditCardId}
                />
            ));
    };
    return (
        <CharityDetailContainer>
            <Navbar />
            <div className="detail-content">
                <div className="action-buttons">
                    <ButtonPrimary variant="contained">Donate</ButtonPrimary>
                    {own ? (
                        <>
                            <ButtonPrimary variant="contained" className="button-delete">
                                Delete
                            </ButtonPrimary>
                            <ButtonDefault variant="outlined">Edit</ButtonDefault>
                        </>
                    ) : (
                        ''
                    )}
                </div>
                <div className="image-container">
                    <img src={charity.coverImageURL || placeholderImg} />
                </div>
                <div className="title">{charity.title}</div>
                <h1 className="owner-name">Owner: {fullName}</h1>
                <div className="description">
                    <h1>Description</h1>
                    <p>{charity.description}</p>
                </div>
                <div className="date">{new Date(charity.dateCreated * 1000).toDateString()}</div>
                <div className="goal">
                    <h1>Progress</h1>
                    <Progress
                        percent={progressValue >= 100 ? 100 : progressValue}
                        status={progressValue >= 100 ? 'success' : 'error'}
                        theme={{ error: { color: COLORS.primary.light }, success: { color: COLORS.primary.main } }}
                    />
                    <div className="goal-amounts">
                        <div>{charity.currentAmount}&nbsp;BGC</div>
                        <div>{charity.goalAmount}&nbsp;BGC</div>
                    </div>
                </div>
                <h1>Donations</h1>
                {donations.length ? renderDonations() : <div className="no-message">No donations so far!</div>}
            </div>
        </CharityDetailContainer>
    );
};

export default CharityDetail;

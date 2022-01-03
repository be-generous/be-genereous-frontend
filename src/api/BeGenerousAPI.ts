import axios from 'axios';

export type Charity = {
    charityId: number;
    goalAmount: number;
    currentAmount: number;
    coverImageURL: string;
    title: string;
    description: string;
    dateCreated: string;
    userId: number;
};

class BeGenerousAPI {
    private static __instance: BeGenerousAPI;
    private baseURL: string;

    constructor() {
        // this.baseURL = 'http://localhost:8080';
        this.baseURL = 'https://be-generous.herokuapp.com';
    }

    public static get getInstance() {
        return this.__instance || (this.__instance = new this());
    }

    public login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${this.baseURL}/api/login`,
                    { email: email, password: password },
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                )
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }
    public register(email: string, password: string, fullName: string, avatarURL: string = '') {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/api/user`, { email: email, password: password, fullName: fullName, avatarURL: avatarURL })
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }
    public getUser(token: string, userId: number) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/api/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }
    public updateUser(token: string, userId: number, newData: object) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${this.baseURL}/api/user/update`,
                    { userId: userId, ...newData },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }
    public createCharity(token: string, charity: Charity) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${this.baseURL}/api/charity/`,
                    {
                        charityId: charity.charityId,
                        goalAmount: charity.goalAmount,
                        currentAmount: charity.currentAmount,
                        coverImageURL: charity.coverImageURL,
                        title: charity.title,
                        description: charity.description,
                        dateCreated: charity.dateCreated,
                        userId: charity.userId
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }
    public updateCharity(token: string, newCharity: Charity) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${this.baseURL}/api/charity/update`,
                    {
                        charityId: newCharity.charityId,
                        goalAmount: newCharity.goalAmount,
                        coverImageURL: newCharity.coverImageURL,
                        title: newCharity.title,
                        description: newCharity.description,
                        userId: newCharity.userId
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }

    public deleteCharity(token: string, id: number) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/api/charity/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((result) => {
                    return resolve(result);
                })
                .catch((e) => {
                    return reject(e);
                });
        });
    }

    public getCharities(token: string) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/api/charity/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }

    public addCreditCard(token: string, creditCardData: any) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/api/creditcard`, creditCardData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }

    public getCreditCards(token: string, userId: number) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/api/creditcard/?id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }

    public getDonationsByCharity(token: string, charityId: number) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.baseURL}/api/donation/charity/${charityId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }

    public donate(token: string, donation: any) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.baseURL}/api/donation`, donation, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((result) => {
                    return resolve(result.data);
                })
                .catch((e) => {
                    return reject(e.response.data);
                });
        });
    }
}
export default BeGenerousAPI.getInstance;

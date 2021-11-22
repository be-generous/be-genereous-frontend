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
        this.baseURL = 'http://localhost:8080';
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
    public updateUser(token: string, userId: number, newEmail: string, newPassword: string, newFullName: string, newAvatarUrl: string) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${this.baseURL}/api/user/`,
                    { userId: userId, email: newEmail, password: newPassword, fullName: newFullName, avatarURL: newAvatarUrl },
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
}
export default BeGenerousAPI.getInstance;

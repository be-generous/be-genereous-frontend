import axios from 'axios';
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
                    console.log(e);
                    return reject(e.response.data);
                });
        });
    }
}
export default BeGenerousAPI.getInstance;

class BeGenerousAPI {
    private static __instance: BeGenerousAPI;
    private baseURL: string;
    constructor() {
        this.baseURL = 'http://localhost/8080';
    }
    public static get getInstance() {
        return this.__instance || (this.__instance = new this());
    }

    public login(email: string, password: string) {
        //TODO() fetching API

        //static data to check
        if (email === 'test' && password === 'testp4ss') {
            return {
                success: true,
                message: 'Register successful',
                token: '12354123fdasdgasdg89yasdgasd'
            };
        }
        return {
            message: 'Invalid email and password combination',
            success: false
        };
    }
}

export default BeGenerousAPI.getInstance;

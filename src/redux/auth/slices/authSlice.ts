import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BeGenerousAPI from '../../../api/BeGenerousAPI';
import { PERSIST } from 'redux-persist';

export const logUserIn = createAsyncThunk('users/logUserIn', async (params: { email: string; password: string }, thunkAPI) => {
    const { email, password } = params;
    try {
        const result: any = await BeGenerousAPI.login(email, password);
        return { token: result.access_token, id: result.id, message: result.message };
    } catch (e: any) {
        return thunkAPI.rejectWithValue({ message: e.error });
    }
});

export const logUserOut = createAsyncThunk('users/logUserOut', async (_, thunkAPI) => {
    const result = await new Promise((resolve) => {
        return resolve(true);
    });
    if (result === false) {
        return thunkAPI.rejectWithValue({ message: 'Logout failed' });
    }
    return { error: null };
});

export interface AuthState {
    token: string;
    id: string;
    loggedIn: boolean;
    isFetching: boolean;
    errMessage: string;
}

const initialState: AuthState = {
    token: '',
    id: '',
    loggedIn: false,
    isFetching: false,
    errMessage: ''
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logUserIn.fulfilled, (state, action: any) => {
                state.token = action.payload.token;
                state.id = action.payload.id;
                state.loggedIn = true;
                state.isFetching = false;
                state.errMessage = action.payload.message;
            })
            .addCase(logUserIn.rejected, (state, action: any) => {
                state.token = '';
                state.id = '';
                state.loggedIn = false;
                state.isFetching = false;
                state.errMessage = action.payload.message;
            })
            .addCase(logUserIn.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(logUserOut.fulfilled, (state, action: any) => {
                state.token = '';
                state.id = '';
                state.loggedIn = false;
                state.isFetching = false;
                state.errMessage = action.payload.message;
            })
            .addCase(logUserOut.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(logUserOut.rejected, (state, action: any) => {
                state.token = '';
                state.id = '';
                state.loggedIn = false;
                state.isFetching = false;
                state.errMessage = action.payload.message;
            })
            .addCase(PERSIST, (state) => {
                state.errMessage = '';
            });
    }
});

export default slice.reducer;

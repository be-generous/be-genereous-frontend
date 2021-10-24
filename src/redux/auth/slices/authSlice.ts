import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const logUserIn = createAsyncThunk('users/logUserIn', async (params: { email: string; password: string }, thunkAPI) => {
    const { email, password } = params;
    const result = await new Promise((resolve, reject) => {
        if (email === 'asd' && password === 'asd') return resolve(true);
        return resolve(false);
    });
    if (result === false) {
        return thunkAPI.rejectWithValue({ message: 'Login failed' });
    }
    const userResponse: { userId: string } = {
        userId: 'asd'
    };
    return { user: userResponse, error: null };
});

export const logUserOut = createAsyncThunk('users/logUserOut', async (_, thunkAPI) => {
    const result = await new Promise((resolve) => {
        return resolve(true);
    });
    if (result === false) {
        return thunkAPI.rejectWithValue({ message: 'Logout failed' });
    }
    return { user: '', error: null };
});

export interface AuthState {
    token: string;
    loggedIn: boolean;
    error: {
        message: string;
    } | null;
}

const initialState: AuthState = {
    token: '',
    loggedIn: false,
    error: null
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logUserIn.fulfilled, (state, action: any) => {
                console.log(action);
                state.token = action.payload.user.userId;
                state.loggedIn = true;
                state.error = null;
            })
            .addCase(logUserIn.rejected, (state, action: any) => {
                console.log(action);
                state.token = '';
                state.loggedIn = false;
                state.error = {
                    message: action.payload.message
                };
            })
            .addCase(logUserOut.fulfilled, (state, action: any) => {
                state.token = '';
                state.loggedIn = false;
                state.error = null;
            })
            .addCase(logUserOut.rejected, (state, action: any) => {
                state.token = '';
                state.error = {
                    message: action.payload.message
                };
            });
    }
});

export default slice.reducer;

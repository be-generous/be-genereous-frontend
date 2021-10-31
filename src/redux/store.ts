import { configureStore } from '@reduxjs/toolkit';
import { createTransform, FLUSH, PAUSE, PERSIST, persistCombineReducers, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slices/authSlice';

const transformCircular = createTransform(
    (inboundState) => JSON.stringify(inboundState),
    (outboundState) => {
        let newState = JSON.parse(outboundState);
        newState.errMessage = '';
        return newState;
    }
);
const rootPersistConfig = {
    key: 'bgroot',
    storage,
    transforms: [transformCircular],

    whitelist: ['auth']
};

const reducers = {
    auth: authReducer
};
const persistedReducer = persistCombineReducers(rootPersistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

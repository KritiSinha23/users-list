import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/user/UserSlice';

export const store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
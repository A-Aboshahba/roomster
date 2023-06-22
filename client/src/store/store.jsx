import { configureStore } from '@reduxjs/toolkit';
import userData from './Slices/userSlice';
import toastSlice from './Slices/toastSlice';

const store = configureStore({
    reducer: {
        user: userData,
        toast: toastSlice,
    },
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import userData from './Slices/userSlice';

const store = configureStore({
    reducer: {
        user: userData,
    },
});

export default store;
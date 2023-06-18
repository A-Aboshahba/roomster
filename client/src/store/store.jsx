import { configureStore } from '@reduxjs/toolkit';
import user from './Slices/user';

const store = configureStore({
    reducer: {
        user: user,
    },
});

export default store;
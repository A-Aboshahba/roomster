import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        message: '',
        type: '',
    },
    reducers: {
        setToast(state, action) {
            const { message, type } = action.payload;
            state.message = message;
            state.type = type;
            toast[type](message)
        },
    },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
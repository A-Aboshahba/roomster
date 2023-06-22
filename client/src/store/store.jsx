
import { configureStore } from "@reduxjs/toolkit";
import userData from "./Slices/userSlice";
import apartments from "./Slices/apartment";
import toastSlice from './Slices/toastSlice';

const store = configureStore({
  reducer: {
    user: userData,
    apartments: apartments,
    toast: toastSlice,

  },
});

export default store;

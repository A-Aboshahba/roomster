import { configureStore } from "@reduxjs/toolkit";
import userData from "./Slices/userSlice";
import apartments from "./Slices/apartment";
import currencySlice from './Slices/currency';

const store = configureStore({
  reducer: {
    user: userData,
    apartments: apartments,
    currency:currencySlice,
  },
});

export default store;

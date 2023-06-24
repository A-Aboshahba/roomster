import { configureStore } from "@reduxjs/toolkit";
import userData from "./Slices/userSlice";
import apartments from "./Slices/apartment";

const store = configureStore({
  reducer: {
    user: userData,
    apartments: apartments,
  },
});

export default store;

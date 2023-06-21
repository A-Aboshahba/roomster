import { configureStore } from "@reduxjs/toolkit";
import user from "./Slices/user";
import apartments from "./Slices/apartment";
const store = configureStore({
  reducer: {
    user: user,
    apartments: apartments,
  },
});

export default store;

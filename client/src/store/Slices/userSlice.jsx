import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Roomster from "../../API/config";

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const res = await Roomster.get(`user/${userId}`);
  console.log(res.data);
  return res.data[0];
});
export const toggleFavorite = createAsyncThunk(
  "user/toggleFavorite",
  async (args, action) => {
    // const res = await Roomster.get(`user/${userId}`);
    // console.log(res.data);
    // return res.data[0];
  }
);

const initialState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: { country: "", city: "" },
    image: {
      url: "",
      publicId: "",
    },
    favourites: [],
    rentedApartments: [],
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;

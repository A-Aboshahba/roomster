import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Roomster from "../../API/config";

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const res = await Roomster.get(`user/${userId}`);
  console.log(res.data);
  return res.data[0];
});
export const addFavorite = createAsyncThunk(
  "user/addFavorite",
  async ({ userId, location }, action) => {
    const res = await Roomster.post(`user/${userId}/favourites`, {
      apartmentId: location._id,
    });
    return location;
  }
);
export const deleteFavorite = createAsyncThunk(
  "user/deleteFavorite",
  async ({ userId, location }, action) => {
    const res = await Roomster.put(`user/${userId}/favourites`, {
      apartmentId: location._id,
    });
    return location;
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

    [addFavorite.fulfilled]: (state, action) => {
      console.log(state.user);
      state.user.favourites.push(action.payload);
    },
    [deleteFavorite.fulfilled]: (state, action) => {
      state.user.favourites = state.user.favourites.filter(
        (obj) => obj.id !== action.payload._id
      );
    },
  },
});

export default userSlice.reducer;

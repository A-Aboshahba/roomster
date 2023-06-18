import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Roomster from "../../API/config";
import jwt_decode from "jwt-decode";


// initial values
const initialState = {
  isAllowed: false,
  user: {}
};

// get info in case user is logined
export const getUserInfo = createAsyncThunk('api/getUserInfo',
  async () => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwt_decode(token);
      const { data } = await Roomster.get(`user/${decodedToken._id}`);
      return data;
    } else return {}
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // to using in login when user login in first time for getting on user's information  in redux store 
    addUserInfo: (state, action) => {
      state.user = action.payload;
      state.isAllowed = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAllowed = true;
      })

  }

});

export const {addUserInfo} = userSlice.actions;

export default userSlice.reducer



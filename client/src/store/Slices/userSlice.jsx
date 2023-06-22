import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Roomster from '../../API/config';

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const { data } = await Roomster.get(`user/${userId}`);
  return data;
}
);

const initialState = {
  user:null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // to using in login when user login in first time for getting on user's information  in redux store 
    addUserInfo: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    ResetRedux: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[0];
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});
export const { addUserInfo,ResetRedux } = userSlice.actions;


export default userSlice.reducer;
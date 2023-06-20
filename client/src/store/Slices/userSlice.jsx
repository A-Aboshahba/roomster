import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Roomster from '../../API/config';

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    const res = await Roomster.get(`user/${userId}`, { headers });
    console.log(res.data);
    return res.data[0];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: {
    _id:'',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: { country: '', city: '' },
    image: {
      url: '',
      publicId: ''
  },
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        const { _id,firstName, lastName, email, password, address ,image} = action.payload;
        state.user._id = _id;
        state.user.firstName = firstName;
        state.user.lastName = lastName;
        state.user.email = email;
        state.user.password = password;
        state.user.address = address;
        state.user.image = image;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
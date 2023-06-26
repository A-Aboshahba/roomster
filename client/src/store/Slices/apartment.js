import Roomster from "../../API/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toastMessage } from "../../utils/toasfiy";

const INITIAL_STATE = {
  status: "idle",
  singleApartment: {},
  apartments: [],
  reviews: [],
  totalReviews: 0,
  // favourites: [],
  // rented: [],
  error: null,
};

export const getApartments = createAsyncThunk(
  "apartments/getApartments",
  async ({ page = 1, filterString = "", keyword = "" }, thunkAPI) => {
    try {
      const response = await Roomster.get(
        `apartments/all?page=${page}${filterString}${keyword}`
      );

      // console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getApartmentReviews = createAsyncThunk(
  "apartments/getApartmentReviews",
  async ({ page = 1, apartmentId }, thunkAPI) => {
    try {
      const response = await Roomster.get(
        `reviews/apartment/${apartmentId}?page=${page}`
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const loadMoreApartments = createAsyncThunk(
  "apartments/loadMoreApartments",
  async ({ page, filterString = "", keyword = "" }, thunkAPI) => {
    try {
      const response = await Roomster.get(
        `apartments/all?page=${page}${filterString}${keyword}`
      );
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getSingleApartment = createAsyncThunk(
  "apartments/getSingleApartment",
  async ({ id }, thunkAPI) => {
    try {
      const response = await Roomster.get(`apartments/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const addReview = createAsyncThunk(
  "apartments/addReview",
  async (data, thunkAPI) => {
    const { apartments, user } = thunkAPI.getState();
    try {
      data.apartmentId = apartments.singleApartment._id;
      data.userId = user.user._id;
      const response = await Roomster.post(`reviews`, data);
      response.data.userId = { ...user.user };
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [getApartments.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.apartments = [...action.payload];
    },
    [getApartments.pending]: (state) => {
      state.status = "loading";
    },
    [getApartments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    },
    [loadMoreApartments.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.apartments.Push(...action.payload);
    },
    [loadMoreApartments.pending]: (state) => {
      state.status = "loading";
    },
    [loadMoreApartments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    },
    [getApartmentReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reviews = [...action.payload.data];
      state.totalReviews = action.payload.totalRate;
    },
    [getApartmentReviews.pending]: (state) => {
      state.status = "loading";
    },
    [getApartmentReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    },

    [getSingleApartment.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.singleApartment = { ...action.payload };
    },
    [getSingleApartment.pending]: (state) => {
      state.status = "loading";
    },
    [getSingleApartment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    },
    //? add review
    [addReview.fulfilled]: (state, action) => {
      toastMessage("success", "Added Successfully");
      state.reviews.push(action.payload);
    },
  },
});

export const getApartmentsState = (state) => state.apartments.apartments;
export const getApartmentReviwsState = (state) => state.apartments.reviews;
export const getApartmentTotalReviwsState = (state) =>
  state.apartments.totalReviews;
export const getSingleApartmentState = (state) =>
  state.apartments.singleApartment;
export default apartmentsSlice.reducer;

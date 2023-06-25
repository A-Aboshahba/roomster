import Roomster from "../../API/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      // console.log("slice", response.data.data);
      return response.data.data;
    } catch (err) {
      comsole.log(err);
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
      console.log(" reviewslice", response.data);
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
      // console.log("slice", response.data.data);
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
      console.log("get single apartment", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// export const toggleFavourite = createAsyncThunk(
//   "apartments/toggleFavourite",
//   async ({ apartmentId }, thunkAPI) => {
//     try {
//       const response = await Roomster.get(
//         `apartments/all?page=${page}${filterString}${keyword}`
//       );
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );
const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApartments.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.apartments = [...action.payload];
    });
    builder.addCase(getApartments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getApartments.rejected, (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    });
    builder.addCase(loadMoreApartments.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.apartments.Push(...action.payload);
    });
    builder.addCase(loadMoreApartments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loadMoreApartments.rejected, (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    });
    builder.addCase(getApartmentReviews.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.reviews = [...action.payload.data];
      state.totalReviews = action.payload.totalRate;
    });
    builder.addCase(getApartmentReviews.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getApartmentReviews.rejected, (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    });

    builder.addCase(getSingleApartment.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.singleApartment = { ...action.payload };
    });
    builder.addCase(getSingleApartment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSingleApartment.rejected, (state, action) => {
      state.status = "failed";
      state.error = {
        message: action.payload.response.data.error.message,
        code: action.payload.response.data.error.code,
      };
    });
  },
});

export const getApartmentsState = (state) => state.apartments.apartments;
export const getApartmentReviwsState = (state) => state.apartments.reviews;
export const getApartmentTotalReviwsState = (state) =>
  state.apartments.totalReviews;
export const getSingleApartmentState = (state) =>
  state.apartments.singleApartment;
// export const getUserStatus = (state) => state.auth.status;
// export const getUsererror = (state) => state.auth.error;
// export const isLoginUser = (state) => state.auth.isLoginUser;

// export const { checkLogin, logOut } = apartmentsSlice.actions;

export default apartmentsSlice.reducer;

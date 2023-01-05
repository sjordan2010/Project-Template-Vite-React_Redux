import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userService from './userService';

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Reduces and initial state for main page
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//signup user. user parameter is passed in at Signup.jsx page
export const signup = createAsyncThunk(
  'user/signup',
  async (user, thunkAPI) => {
    console.log('Inside signup func in userSlice!!');
    try {
      console.log('Inside try of signup func in userSlice!!!');
      const data = await userService.signup(user);
      console.log('This is retrieved data from userService!!!!');
      return data;
    } catch (error) {
      //message could be in several different places, this checks all of them:
      console.log('Some error inside the signup func of userService/userSlice');
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user. user parameter is passed in at Login.jsx page
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  console.log('Inside login func in userSlice!!');
  try {
    console.log('Inside try of login func in userSlice!!!');
    const data = await userService.login(user);
    console.log('This is retrieved data from userService!!!!');
    return data;
  } catch (error) {
    //message could be in several different places, this checks all of them:
    console.log('Some error inside the login func of userService/userSlice');
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('user/logout', async (state) => {
  await userService.logout();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //in signup func above, successful signup cases send the user info back
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //in signup func above, on error cases, a message is returned
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //in login func above, successful login cases send the user info back
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //in login func above, on error cases, a message is returned
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

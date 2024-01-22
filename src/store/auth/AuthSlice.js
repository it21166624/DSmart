import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../service/AuthService';

//For Login -----------------------------------------------------
export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const response = await AuthService.login(username, password);

    if (response.StatusCode === 200 && response.AuthKey) {
      return response;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
});

// For Logout ------------------------------------------------------
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await AuthService.logout();

    return { message: 'Logout successful' };
  } catch (error) {
    throw error;
  }
});

// For store loginstate when page is refresh
export const setLoginStatus = createAsyncThunk(
  'auth/setLoginStatus',
  ({ isLoggedIn }, thunkAPI) => {
    return { isLoggedIn };
  },
);

const initialState = { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      if (action.payload.StatusCode === 200 && action.payload.AuthKey) {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem('logedinkey', 'true');
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {},
    [setLoginStatus.fulfilled]: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    [setLoginStatus.rejected]: (state, action) => {},
  },
});

export default authSlice.reducer;

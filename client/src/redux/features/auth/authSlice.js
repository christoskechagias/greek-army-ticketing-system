import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.idToken = action.payload;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.idToken = "";
    },
    logoutError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchUserInfoRequest: (state) => {
      state.loading = true;
    },
    fetchUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    fetchUserInfoError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  fetchUserInfoRequest,
  fetchUserInfoSuccess,
  fetchUserInfoError,
} = authSlice.actions;

export default authSlice.reducer;

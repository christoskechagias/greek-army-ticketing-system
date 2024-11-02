import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import * as userReducers from "./reducers/userReducers";
import * as ticketReducers from "./reducers/ticketReducers";
import * as memberReducers from "./reducers/memberReducers";
import * as appReducers from "./reducers/appReducers";

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    ...userReducers,
    ...ticketReducers,
    ...memberReducers,
    ...appReducers,
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
  createUserRequest,
  createUserSuccess,
  createUserError,
  updateUserRequest,
  updateUserSuccess,
  updateUserError,
  updateUserPasswordRequest,
  updateUserPasswordSuccess,
  updateUserPasswordError,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserError,
  fetchMembersRequest,
  fetchMembersSuccess,
  fetchMembersError,
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsError,
  fetchTicketRequest,
  fetchTicketSuccess,
  fetchTicketError,
  updateTicketRequest,
  updateTicketSuccess,
  updateTicketError,
  deleteTicketsRequest,
  deleteTicketsSuccess,
  deleteTicketsError,
  fetchBannersRequest,
  fetchBannersSuccess,
  fetchBannersError,
  createBannerRequest,
  createBannerSuccess,
  createBannerError,
  deleteBannerRequest,
  deleteBannerSuccess,
  deleteBannerError,
  updateBannerRequest,
  updateBannerSuccess,
  updateBannerError,
  resetState,
} = admin.actions;
export default admin.reducer;

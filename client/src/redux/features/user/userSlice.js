import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import * as ticketReducers from "./reducers/ticketReducers";
import * as commentReducers from "./reducers/commentReducers";
import * as appReducers from "./reducers/appReducers";

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    ...ticketReducers,
    ...commentReducers,
    ...appReducers,
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  createTicketRequest,
  createTicketSuccess,
  createTicketError,
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsError,
  fetchTicketRequest,
  fetchTicketSuccess,
  fetchTicketError,
  createCommentRequest,
  createCommentSuccess,
  createCommentError,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsError,
  fetchBannersRequest,
  fetchBannersSuccess,
  fetchBannersError,
  resetState,
} = user.actions;

export default user.reducer;

import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import * as ticketReducers from "./reducers/ticketReducers";

const member = createSlice({
  name: "member",
  initialState,
  reducers: {
    ...ticketReducers,
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const {
  fetchTicketsByWeekRequest,
  fetchTicketsByWeekSuccess,
  fetchTicketsByWeekError,

  fetchTicketsByDateRequest,
  fetchTicketsByDateSuccess,
  fetchTicketsByDateError,

  fetchTodayTicketsStatsRequest,
  fetchTodayTicketsStatsSuccess,
  fetchTodayTicketsStatsError,

  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsError,

  fetchTicketRequest,
  fetchTicketSuccess,
  fetchTicketError,

  updateTicketRequest,
  updateTicketSuccess,
  updateTicketError,

  fetchMembersStatsRequest,
  fetchMembersStatsSuccess,
  fetchMembersStatsError,

  resetState,
} = member.actions;

export default member.reducer;

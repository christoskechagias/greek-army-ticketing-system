import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchTicketCategoriesRequest: (state) => {
      state.loadingTicketCategories = true;
    },
    fetchTicketCategoriesSuccess: (state, action) => {
      state.loadingTicketCategories = false;
      state.ticketCategories = action.payload;
    },
    fetchTicketCategoriesError: (state, action) => {
      state.loadingTicketCategories = false;
      state.error = action.payload;
    },

    fetchOfficesRequest: (state) => {
      state.loadingOffices = true;
    },
    fetchOfficesSuccess: (state, action) => {
      state.loadingOffices = false;
      state.offices = action.payload;
    },
    fetchOfficesError: (state, action) => {
      state.loadingOffices = false;
      state.error = action.payload;
    },

    fetchBrandsRequest: (state) => {
      state.loadingBrands = true;
    },
    fetchBrandsSuccess: (state, action) => {
      state.loadingBrands = false;
      state.brands = action.payload;
    },
    fetchBrandsError: (state, action) => {
      state.loadingBrands = false;
      state.error = action.payload;
    },

    fetchRanksRequest: (state) => {
      state.loadingRanks = true;
    },
    fetchRanksSuccess: (state, action) => {
      state.loadingRanks = false;
      state.ranks = action.payload;
    },
    fetchRanksError: (state, action) => {
      state.loadingRanks = false;
      state.error = action.payload;
    },

    fetchRolesRequest: (state) => {
      state.loadingRoles = true;
    },
    fetchRolesSuccess: (state, action) => {
      state.loadingRoles = false;
      state.roles = action.payload;
    },
    fetchRolesError: (state, action) => {
      state.loadingRoles = false;
      state.error = action.payload;
    },

    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  fetchTicketCategoriesRequest,
  fetchTicketCategoriesSuccess,
  fetchTicketCategoriesError,

  fetchOfficesRequest,
  fetchOfficesSuccess,
  fetchOfficesError,

  fetchRanksRequest,
  fetchRanksSuccess,
  fetchRanksError,

  fetchBrandsRequest,
  fetchBrandsSuccess,
  fetchBrandsError,

  fetchRolesRequest,
  fetchRolesSuccess,
  fetchRolesError,

  resetState,
} = app.actions;

export default app.reducer;

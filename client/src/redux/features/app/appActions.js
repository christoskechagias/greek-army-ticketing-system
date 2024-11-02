import axios from "../../../utils/axios";
import {
  fetchOfficesRequest,
  fetchOfficesSuccess,
  fetchOfficesError,
  fetchBrandsRequest,
  fetchBrandsSuccess,
  fetchBrandsError,
  fetchRanksRequest,
  fetchRanksSuccess,
  fetchRanksError,
  fetchTicketCategoriesRequest,
  fetchTicketCategoriesSuccess,
  fetchTicketCategoriesError,
  fetchRolesRequest,
  fetchRolesSuccess,
  fetchRolesError,
} from "./appSlice";
import { alert } from "../alert/alertSlice";
import { alertType } from "../alert/alertTypes";

export const fetchRoles = () => (dispatch) => {
  dispatch(fetchRolesRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/app/roles")
      .then((response) => {
        dispatch(fetchRolesSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(fetchRolesError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
      });
  });
};

export const fetchTicketCategories = () => (dispatch) => {
  dispatch(fetchTicketCategoriesRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/app/ticket/categories")
      .then((response) => {
        dispatch(fetchTicketCategoriesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchTicketCategoriesError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
        reject(error);
      });
  });
};

export const fetchOffices = (searchText) => (dispatch) => {
  dispatch(fetchOfficesRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/app/offices", { params: { searchText } })
      .then((response) => {
        dispatch(fetchOfficesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchOfficesError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
        reject(error);
      });
  });
};

export const fetchBrands = (searchText) => (dispatch) => {
  dispatch(fetchBrandsRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/app/brands", { params: { searchText } })
      .then((response) => {
        dispatch(fetchBrandsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchBrandsError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
        reject(error);
      });
  });
};

export const fetchRanks = (searchText) => (dispatch) => {
  dispatch(fetchRanksRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/app/ranks", { params: { searchText } })
      .then((response) => {
        dispatch(fetchRanksSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchRanksError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
        reject(error);
      });
  });
};

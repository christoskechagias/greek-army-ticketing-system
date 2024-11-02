import axios from "../../../utils/axios";
import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  fetchUserInfoRequest,
  fetchUserInfoSuccess,
  fetchUserInfoError,
} from "./authSlice";
import { alert } from "../alert/alertSlice";
import Cookies from "js-cookie";
import { alertType } from "../alert/alertTypes";

export const login = (userName, password) => (dispatch) => {
  dispatch(loginRequest());
  return new Promise((resolve, reject) => {
    axios
      .post("/users/login", { userName, password })
      .then((response) => {
        if (response) {
          const idToken = Cookies.get("id_token");
          dispatch(loginSuccess(idToken));
          resolve(response.data);
        }
      })
      .catch((error) => {
        Cookies.remove("id_token");
        dispatch(loginError(error.response?.data?.message));
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

export const checkAuthorization = () => (dispatch) => {
  const idToken = Cookies.get("id_token");
  if (idToken) {
    dispatch(loginSuccess(idToken));
    return dispatch(fetchUserInfo());
  }
  return null;
};

export const logout = () => (dispatch) => {
  dispatch(logoutRequest());
  return new Promise((resolve, reject) => {
    axios
      .delete("/users/logout")
      .then(() => {
        dispatch(logoutSuccess());
        window.location.href = "/login";
      })
      .catch((error) => {
        dispatch(logoutError());
        reject(error);
      });
  });
};

export const fetchUserInfo = () => (dispatch) => {
  dispatch(fetchUserInfoRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/users/profile")
      .then((response) => {
        if (response) {
          dispatch(fetchUserInfoSuccess(response.data));
          resolve();
        }
      })
      .catch((error) => {
        dispatch(fetchUserInfoError(error.response.data.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
        if (error.response?.status === 401) {
          Cookies.remove("id_token");
        }
      });
  });
};

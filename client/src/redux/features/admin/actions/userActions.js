import axios from "../../../../utils/axios";
import {
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
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserError,
  updateUserPasswordRequest,
  updateUserPasswordSuccess,
  updateUserPasswordError,
} from "../adminSlice";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";

export const createUser = (newUserData) => (dispatch) => {
  dispatch(createUserRequest());
  return new Promise((resolve, reject) => {
    axios
      .post("/admin/users/new", newUserData)
      .then((response) => {
        if (response) {
          dispatch(createUserSuccess());
          dispatch(
            alert({ type: alertType.success, message: response.data.message })
          );
          resolve();
        }
      })
      .catch((error) => {
        dispatch(createUserError(error.response?.data?.message));
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

export const updateUser = (newUserData) => (dispatch) => {
  dispatch(updateUserRequest());
  return new Promise((resolve, reject) => {
    axios
      .put("/admin/users/update", newUserData)
      .then((response) => {
        if (response) {
          dispatch(updateUserSuccess());
          dispatch(
            alert({ type: alertType.success, message: response.data.message })
          );
          resolve();
        }
      })
      .catch((error) => {
        dispatch(updateUserError(error.response?.data?.message));
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

export const updateUserPassword = (newPassword) => (dispatch) => {
  dispatch(updateUserPasswordRequest());
  return new Promise((resolve, reject) => {
    axios
      .put("/admin/users/update/password", newPassword)
      .then((response) => {
        if (response) {
          dispatch(updateUserPasswordSuccess());
          dispatch(
            alert({ type: alertType.success, message: response.data.message })
          );
          resolve();
        }
      })
      .catch((error) => {
        dispatch(updateUserPasswordError(error.response?.data?.message));
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

export const deleteUser = (userId) => (dispatch) => {
  dispatch(deleteUserRequest());
  return new Promise((resolve, reject) => {
    axios
      .delete(`/admin/users/${userId}`)
      .then((response) => {
        if (response.data) {
          dispatch(deleteUserSuccess(response.data.userId));
          dispatch(
            alert({ type: alertType.success, message: response.data.message })
          );
          resolve();
        }
      })
      .catch((error) => {
        dispatch(deleteUserError(error.response?.data?.message));
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

export const fetchUsers = (pagination, search) => (dispatch) => {
  dispatch(fetchUsersRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/users", { params: { pagination, search } })
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error.response?.data?.message));
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

export const fetchUser = (userId) => (dispatch) => {
  dispatch(fetchUserRequest());
  return new Promise((resolve, reject) => {
    axios
      .get(`/admin/users/${userId}`)
      .then((response) => {
        dispatch(fetchUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserError(error.response?.data?.message));
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

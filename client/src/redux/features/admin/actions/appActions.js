import axios from "../../../../utils/axios";
import {
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
} from "../adminSlice";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";

export const fetchBanners = () => (dispatch) => {
  dispatch(fetchBannersRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/app/banners")
      .then((response) => {
        dispatch(fetchBannersSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(fetchBannersError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
      });
  });
};

export const createBanner = (bannerData) => (dispatch) => {
  dispatch(createBannerRequest());
  return new Promise((resolve, reject) => {
    axios
      .post("/admin/app/banners/create", bannerData)
      .then((response) => {
        if (response) {
          dispatch(createBannerSuccess(response.data.banner));
          dispatch(
            alert({ type: alertType.success, message: response.data.message })
          );
          resolve();
        }
      })
      .catch((error) => {
        dispatch(createBannerError(error.response?.data?.message));
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

export const deleteBanner = (bannerId) => (dispatch) => {
  dispatch(deleteBannerRequest());
  console.log(bannerId);
  return new Promise((resolve, reject) => {
    axios
      .delete(`/admin/app/banners/${bannerId}`)
      .then((response) => {
        if (response.data) {
          dispatch(deleteBannerSuccess(response.data.bannerId));
          dispatch(
            alert({ type: alertType.success, message: response.data.message })
          );
          resolve();
        }
      })
      .catch((error) => {
        dispatch(deleteBannerError(error.response?.data?.message));
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

export const updateBanner = (bannerData) => (dispatch) => {
  dispatch(updateBannerRequest());
  return new Promise((resolve, reject) => {
    axios
      .put("/admin/app/banners/update", bannerData)
      .then((response) => {
        if (response) {
          dispatch(updateBannerSuccess(response.data.banner));
          dispatch(
            alert({ type: alertType.success, message: response.data.message })
          );
          resolve();
        }
      })
      .catch((error) => {
        dispatch(updateBannerError(error.response?.data?.message));
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

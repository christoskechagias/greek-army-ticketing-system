import axios from "../../../../utils/axios";
import {
  fetchBannersRequest,
  fetchBannersSuccess,
  fetchBannersError,
} from "../userSlice";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";

export const fetchBanners = () => (dispatch) => {
  dispatch(fetchBannersRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/users/app/banners")
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

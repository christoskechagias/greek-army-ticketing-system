import axios from "../../../../utils/axios";
import {
  fetchMembersRequest,
  fetchMembersSuccess,
  fetchMembersError,
} from "../adminSlice";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";

export const fetchMembers = () => (dispatch) => {
  dispatch(fetchMembersRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/members")
      .then((response) => {
        dispatch(fetchMembersSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(fetchMembersError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
      });
  });
};

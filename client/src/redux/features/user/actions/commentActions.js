import axios from "../../../../utils/axios";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";
import {
  createCommentRequest,
  createCommentSuccess,
  createCommentError,
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsError,
} from "../userSlice";

export const createComment = (commentData) => (dispatch) => {
  dispatch(createCommentRequest());
  return new Promise((resolve, reject) => {
    axios
      .post("/users/comments", commentData)
      .then((response) => {
        dispatch(createCommentSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(createCommentError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
      });
  });
};

export const fetchComments = (ticketId) => (dispatch) => {
  dispatch(fetchCommentsRequest());
  return new Promise((resolve, reject) => {
    axios
      .get(`/users/tickets/${ticketId}/comments`)
      .then((response) => {
        dispatch(fetchCommentsSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(fetchCommentsError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
      });
  });
};

import axios from "../../../../utils/axios";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";
import {
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsError,
  createTicketRequest,
  createTicketSuccess,
  createTicketError,
  fetchTicketRequest,
  fetchTicketSuccess,
  fetchTicketError,
} from "../userSlice";

export const createTicket = (newTicketData) => (dispatch) => {
  dispatch(createTicketRequest());
  return new Promise((resolve, reject) => {
    axios
      .post("/users/tickets", newTicketData)
      .then((response) => {
        dispatch(createTicketSuccess());
        dispatch(
          alert({ type: alertType.success, message: response?.data?.message })
        );
        resolve();
      })
      .catch((error) => {
        dispatch(createTicketError(error.response?.data?.message));
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

export const fetchTickets = (pagination, search, filters) => (dispatch) => {
  dispatch(fetchTicketsRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/users/tickets", { params: { pagination, search, filters } })
      .then((response) => {
        dispatch(fetchTicketsSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(fetchTicketsError(error.response?.data?.message));
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

export const fetchTicket = (ticketId) => (dispatch) => {
  dispatch(fetchTicketRequest());
  return new Promise((resolve, reject) => {
    axios
      .get(`/users/tickets/${ticketId}`)
      .then((response) => {
        dispatch(fetchTicketSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(fetchTicketError(error.response?.data?.message));
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

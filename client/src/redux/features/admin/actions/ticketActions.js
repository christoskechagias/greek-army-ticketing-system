import axios from "../../../../utils/axios";
import {
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsError,
  fetchTicketRequest,
  fetchTicketSuccess,
  fetchTicketError,
  updateTicketRequest,
  updateTicketSuccess,
  updateTicketError,
  deleteTicketsRequest,
  deleteTicketsSuccess,
  deleteTicketsError,
} from "../adminSlice";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";

export const deleteManyTickets = (data) => (dispatch) => {
  dispatch(deleteTicketsRequest());
  return new Promise((resolve, reject) => {
    axios
      .delete("/admin/tickets", { data })
      .then((response) => {
        dispatch(deleteTicketsSuccess(data));
        dispatch(
          alert({ type: alertType.success, message: response.data.message })
        );
        resolve();
      })
      .catch((error) => {
        dispatch(deleteTicketsError(error.response?.data?.message));
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

export const updateTicketStatus = (ticketId) => (dispatch) => {
  dispatch(updateTicketRequest());
  return new Promise((resolve, reject) => {
    axios
      .put("/admin/tickets/status", { ticketId })
      .then((response) => {
        dispatch(updateTicketSuccess(response.data.ticket));
        dispatch(
          alert({ type: alertType.success, message: response.data.message })
        );
        resolve();
      })
      .catch((error) => {
        dispatch(updateTicketError(error.response?.data?.message));
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
      .get(`/admin/tickets/${ticketId}`)
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
      });
  });
};

export const fetchTickets = (pagination, search, filters) => (dispatch) => {
  dispatch(fetchTicketsRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/tickets", { params: { pagination, search, filters } })
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
      });
  });
};

export const updateTicketAssignee = (data) => (dispatch) => {
  dispatch(updateTicketRequest());
  return new Promise((resolve, reject) => {
    axios
      .put("/admin/tickets/assignee", data)
      .then((response) => {
        dispatch(updateTicketSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(updateTicketError(error.response?.data?.message));
        dispatch(
          alert({
            type: alertType.error,
            message: error.response?.data?.message,
          })
        );
      });
  });
};

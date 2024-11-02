import axios from "../../../../utils/axios";
import {
  fetchTicketsByWeekRequest,
  fetchTicketsByWeekSuccess,
  fetchTicketsByWeekError,
  fetchTicketsByDateRequest,
  fetchTicketsByDateSuccess,
  fetchTicketsByDateError,
  fetchTodayTicketsStatsRequest,
  fetchTodayTicketsStatsSuccess,
  fetchTodayTicketsStatsError,
  fetchMembersStatsRequest,
  fetchMembersStatsSuccess,
  fetchMembersStatsError,
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsError,
  fetchTicketRequest,
  fetchTicketSuccess,
  fetchTicketError,
  updateTicketRequest,
  updateTicketSuccess,
  updateTicketError,
} from "../memberSlice";
import { alert } from "../../alert/alertSlice";
import { alertType } from "../../alert/alertTypes";

export const fetchTickets = (pagination, search, filters) => (dispatch) => {
  dispatch(fetchTicketsRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/members/tickets", { params: { pagination, search, filters } })
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
      .get(`/members/tickets/${ticketId}`)
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

export const updateTicketAssignee = (data) => (dispatch) => {
  dispatch(updateTicketRequest());
  return new Promise((resolve, reject) => {
    axios
      .put("/members/tickets/assign/me", data)
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
        reject(error);
      });
  });
};

export const updateTicketStatus = (ticketId) => (dispatch) => {
  dispatch(updateTicketRequest());
  return new Promise((resolve, reject) => {
    axios
      .put("/members/tickets/status", { ticketId })
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

export const fetchTicketsByWeek = (startOfWeek, endOfWeek) => (dispatch) => {
  dispatch(fetchTicketsByWeekRequest());

  return new Promise((resolve, reject) => {
    axios
      .get(`/members/statistics/ticketsByWeek`, {
        params: { startOfWeek, endOfWeek },
      })
      .then((response) => {
        dispatch(fetchTicketsByWeekSuccess(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(fetchTicketsByWeekError(error.response?.data?.message));
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

export const fetchTicketsByDate = (date) => (dispatch) => {
  dispatch(fetchTicketsByDateRequest());

  return new Promise((resolve, reject) => {
    axios
      .get(`/members/statistics/ticketsByDate`, {
        params: { date },
      })
      .then((response) => {
        dispatch(fetchTicketsByDateSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchTicketsByDateError(error.response?.data?.message));
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
export const fetchTodayTicketsStats = (date) => (dispatch) => {
  dispatch(fetchTodayTicketsStatsRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/members/statistics/tickets/today")
      .then((response) => {
        dispatch(fetchTodayTicketsStatsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchTodayTicketsStatsError(error.response?.data?.message));
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

export const fetchMembersStats = (date) => (dispatch) => {
  dispatch(fetchMembersStatsRequest());
  return new Promise((resolve, reject) => {
    axios
      .get("/members/statistics")
      .then((response) => {
        dispatch(fetchMembersStatsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMembersStatsError(error.response?.data?.message));
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

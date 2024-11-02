// src/redux/slices/adminSlice/ticketReducers.js

export const fetchTicketsRequest = (state) => {
  state.loadingTickets = true;
};

export const fetchTicketsSuccess = (state, action) => {
  state.loadingTickets = false;
  state.tickets = action.payload.tickets;
  state.totalTickets = action.payload.totalTickets;
};

export const fetchTicketsError = (state, action) => {
  state.loadingTickets = false;
  state.error = action.payload;
};

export const fetchTicketRequest = (state) => {
  state.loadingTicket = true;
};

export const fetchTicketSuccess = (state, action) => {
  state.loadingTicket = false;
  state.ticket = action.payload;
};

export const fetchTicketError = (state, action) => {
  state.loadingTicket = false;
  state.error = action.payload;
};

export const deleteTicketsRequest = (state) => {
  state.loadingTicket = true;
};

export const deleteTicketsSuccess = (state, action) => {
  const deletedTicketIds = action.payload;
  state.loadingTicket = false;
  state.tickets = state.tickets.filter(
    (ticket) => !deletedTicketIds.includes(ticket._id)
  );
};

export const deleteTicketsError = (state, action) => {
  state.loadingTicket = false;
  state.error = action.payload;
};

export const updateTicketRequest = (state) => {
  state.loadingTicket = true;
};

export const updateTicketSuccess = (state, action) => {
  state.loadingTicket = false;
  state.ticket = action.payload;
};

export const updateTicketError = (state, action) => {
  state.loadingTicket = false;
  state.error = action.payload;
};

export const createTicketRequest = (state) => {
  state.loadingTicket = true;
};
export const createTicketSuccess = (state) => {
  state.loadingTicket = false;
};
export const createTicketError = (state, action) => {
  state.loadingTicket = false;
  state.error = action.payload;
};

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

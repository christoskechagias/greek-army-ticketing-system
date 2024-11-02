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

export const fetchTicketsByWeekRequest = (state, action) => {
  state.loadingTicketsByWeek = true;
};
export const fetchTicketsByWeekSuccess = (state, action) => {
  state.loadingTicketsByWeek = false;
  state.ticketsByWeek = action.payload;
};
export const fetchTicketsByWeekError = (state, action) => {
  state.loadingTicketsByWeek = false;
  state.error = action.payload;
};

export const fetchTicketsByDateRequest = (state) => {
  state.loadingTicketsByDate = true;
};
export const fetchTicketsByDateSuccess = (state, action) => {
  state.loadingTicketsByDate = false;
  state.ticketsByDate = action.payload;
};
export const fetchTicketsByDateError = (state, action) => {
  state.loadingTicketsByDate = false;
  state.error = action.payload;
};

export const fetchTodayTicketsStatsRequest = (state) => {
  state.loadingTodayTicketsStats = true;
};
export const fetchTodayTicketsStatsSuccess = (state, action) => {
  state.loadingTodayTicketsStats = false;
  state.todayTicketsStats = action.payload;
};
export const fetchTodayTicketsStatsError = (state, action) => {
  state.loadingTodayTicketsStats = false;
  state.error = action.payload;
};

export const fetchMembersStatsRequest = (state) => {
  state.loadingMembersStats = true;
};
export const fetchMembersStatsSuccess = (state, action) => {
  state.loadingMembersStats = false;
  state.membersStats = action.payload;
};
export const fetchMembersStatsError = (state, action) => {
  state.loadingMembersStats = false;
  state.error = action.payload;
};

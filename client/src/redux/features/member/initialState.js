const initialState = {
  error: "",

  loadingTickets: false,
  totalTickets: 0,
  tickets: [],

  loadingTicket: false,
  ticket: {},

  loadingTicketsByDate: false,
  ticketsByDate: [],

  loadingTicketsByWeek: false,
  ticketsByWeek: [],

  loadingTodayTicketsStats: false,
  todayTicketsStats: {},

  loadingMembersStats: false,
  membersStats: [],
};

export default initialState;

import React from "react";
import RestrictedRoute from "./RestrictedRoute";
import AllTickets from "../pages/member/tickets/AllTickets";
import Ticket from "../pages/member/tickets/Ticket";

const TicketsRoutes = [
  {
    path: "member/tickets/my",
    element: (
      <RestrictedRoute acceptedRoles={["member"]} component={AllTickets} />
    ),
  },
  {
    path: "member/tickets/all",
    element: (
      <RestrictedRoute acceptedRoles={["member"]} component={AllTickets} />
    ),
  },
  {
    path: "member/tickets/:ticketId/update",
    element: <RestrictedRoute acceptedRoles={["member"]} component={Ticket} />,
  },
];

const MemberRoutes = [...TicketsRoutes];

export default MemberRoutes;

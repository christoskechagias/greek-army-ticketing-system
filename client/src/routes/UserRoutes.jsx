import React from "react";
import RestrictedRoute from "./RestrictedRoute";
import CreateTicket from "../pages/user/tickets/CreateTicket";
import MyTickets from "../pages/user/tickets/MyTickets";
import Ticket from "../pages/user/tickets/Ticket";

const UserRoutes = [
  {
    path: "tickets",
    children: [
      {
        path: "my",
        element: (
          <RestrictedRoute
            acceptedRoles={["admin", "user"]}
            component={MyTickets}
          />
        ),
      },
      {
        path: "create",
        element: (
          <RestrictedRoute
            acceptedRoles={["admin", "user"]}
            component={CreateTicket}
          />
        ),
      },
      {
        path: ":ticketId/update",
        element: (
          <RestrictedRoute
            acceptedRoles={["admin", "user"]}
            component={Ticket}
          />
        ),
      },
    ],
  },
];

export default UserRoutes;

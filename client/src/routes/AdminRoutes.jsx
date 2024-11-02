import React from "react";
import RestrictedRoute from "./RestrictedRoute";
import CreateUser from "../pages/admin/users/CreateUser";
import UpdateUser from "../pages/admin/users/UpdateUser";
import UpdatePassword from "../pages/admin/users/UpdatePassword";
import AllTickets from "../pages/admin/tickets/AllTickets";
import AllUsers from "../pages/admin/users/AllUsers";
import Ticket from "../pages/admin/tickets/Ticket";
import Settings from "../pages/admin/app/Settings";
import BannersTable from "../components/tables/banners/BannersTable";

const UsersRoutes = [
  {
    path: "admin/users",
    element: <RestrictedRoute acceptedRoles={["admin"]} component={AllUsers} />,
  },
  {
    path: "admin/users/new",
    element: (
      <RestrictedRoute acceptedRoles={["admin"]} component={CreateUser} />
    ),
  },
  {
    path: "admin/users/:userId/update",
    element: (
      <RestrictedRoute acceptedRoles={["admin"]} component={UpdateUser} />
    ),
  },
  {
    path: "admin/users/:userId/password/update",
    element: (
      <RestrictedRoute acceptedRoles={["admin"]} component={UpdatePassword} />
    ),
  },
];

const TicketsRoutes = [
  {
    path: "admin/tickets",
    element: (
      <RestrictedRoute acceptedRoles={["admin"]} component={AllTickets} />
    ),
  },
  {
    path: "/admin/tickets/:ticketId/update",
    element: <RestrictedRoute acceptedRoles={["admin"]} component={Ticket} />,
  },
];

const AppRoutes = [
  {
    path: "admin/app/settings",
    element: <RestrictedRoute acceptedRoles={["admin"]} component={Settings} />,
    children: [
      {
        path: "banners",
        element: (
          <RestrictedRoute acceptedRoles={["admin"]} component={BannersTable} />
        ),
      },
    ],
  },
];

const AdminRoutes = [
  {
    children: [...UsersRoutes, ...TicketsRoutes, ...AppRoutes],
  },
];

export default AdminRoutes;

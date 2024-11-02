import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/Login";
import ErrorPage from "../pages/ErrorPage";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import store from "../redux/store";
import { checkAuthorization } from "../redux/features/auth/authActions";
import AuthRedirect from "./AuthRedirect";
import MemberRoutes from "./MemberRoutes";
import RestrictedRoute from "./RestrictedRoute";
import Dashboard from "../pages/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: () => {
      return new Promise((resolve, reject) => {
        store
          .dispatch(checkAuthorization())
          .then(() => {
            resolve(null);
          })
          .catch((error) => reject(error));
      });
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: (
          <RestrictedRoute
            acceptedRoles={["admin", "member"]}
            component={Dashboard}
          />
        ),
      },
      ...UserRoutes,
      ...AdminRoutes,
      ...MemberRoutes,
    ],
  },
  {
    id: "login",
    path: "/login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    ),
  },
]);

export default router;

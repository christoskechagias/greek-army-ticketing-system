import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
function RestrictedRoute({ acceptedRoles, component: Component, ...rest }) {
  const { profile, idToken } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(idToken);

  const checkRoles = () => {
    if (
      acceptedRoles &&
      profile.roles &&
      acceptedRoles.some((role) => profile.roles.includes(role))
    ) {
      return <Component {...rest} />;
    }
    return <ErrorPage />;
  };

  return isLoggedIn ? checkRoles() : <Navigate to="/login" />;
}

export default RestrictedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const { idToken } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(idToken);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/tickets/my");
    }
  }, [isLoggedIn, navigate]);

  return !isLoggedIn ? children : null;
};

export default AuthRedirect;

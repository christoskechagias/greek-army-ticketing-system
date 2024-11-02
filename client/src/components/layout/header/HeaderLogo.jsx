// HeaderLogo.jsx
import React from "react";
import { Link } from "react-router-dom";
import merypLogo from "../../../assets/merypLogo.png";

function HeaderLogo() {
  return (
    <Link to="/tickets/my" className="flex items-center gap-4">
      <img className="h-10" src={merypLogo} alt="meryp_logo" />
      <p className="text-lg font-medium text-white">ΓΕΠ</p>
    </Link>
  );
}

export default HeaderLogo;

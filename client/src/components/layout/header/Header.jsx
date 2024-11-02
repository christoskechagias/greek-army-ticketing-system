// Header.jsx
import React from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderDropdown from "./HeaderDropdown";
import Banner from "./Banner";

function Header() {
  return (
    <div className="sticky top-0 z-[99] bg-blue-500 py-2 px-5 flex items-center justify-between gap-10">
      <HeaderLogo />
      <Banner />
      <HeaderDropdown />
    </div>
  );
}

export default Header;

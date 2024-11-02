import React from "react";
import merypLogo from "../../../assets/merypLogo.png";

function BackgroundImage() {
  return (
    <img
      unselectable="on"
      className="opacity-[0.05] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[500px] w-full pointer-events-none z-[99]"
      src={merypLogo}
      alt="ΜΕΡΥΠ"
    />
  );
}

export default BackgroundImage;

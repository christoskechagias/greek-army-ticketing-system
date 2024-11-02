import React from "react";

function Footer() {
  return (
    <footer className="select-none m-3">
      <p className="text-xs text-center">
        {new Date().getFullYear()} &copy; MERYP/GEP by Christos Kechagias
      </p>
    </footer>
  );
}

export default Footer;

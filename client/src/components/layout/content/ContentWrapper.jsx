import React from "react";

function ContentWrapper({ title = "", children, customStyle = "" }) {
  return (
    <div className={`bg-white shadow-md rounded-lg w-full p-3 ${customStyle}`}>
      {title && <p className="text-lg font-semibold">{title}</p>}
      {children}
    </div>
  );
}

export default ContentWrapper;

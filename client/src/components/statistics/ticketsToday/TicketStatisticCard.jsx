import React from "react";

const TicketStatisticCard = ({ status, value }) => {
  return (
    <div
      className={`flex items-end justify-between w-full p-4 rounded-2xl shadow-md transition-transform transform hover:scale-105 duration-300 ease-out ${status.style} bg-gradient-to-br`}
    >
      <p className="text-5xl font-bold text-white">{value}</p>
      <p className="text-base font-semibold text-white">{status.title}</p>
    </div>
  );
};

export default TicketStatisticCard;

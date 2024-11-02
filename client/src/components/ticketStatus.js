import React from "react";
import {
  PiCheckCircleBold,
  PiCircleBold,
  PiDotsThreeCircleLight,
} from "react-icons/pi";

export const statusItems = [
  {
    title: "Ανοιχτό",
    key: "open",
    icon: <PiCircleBold size={25} color="#3B82F6" />,
  },
  {
    title: "Σε εξέλιξη",
    key: "inProgress",
    icon: <PiDotsThreeCircleLight size={25} color="orange" />,
  },
  {
    title: "Ολοκληρωμένο",
    key: "completed",
    icon: <PiCheckCircleBold size={25} color="green" />,
  },
];

export const getStatusByKey = (key) => {
  return statusItems.find((item) => item.key === key);
};

export const isTicketStatus = (statusKey, targetKey) => {
  const status = getStatusByKey(statusKey);
  return status ? status.key === targetKey : false;
};

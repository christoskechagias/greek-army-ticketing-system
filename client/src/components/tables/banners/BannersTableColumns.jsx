import React from "react";
import { Button } from "antd";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export const getColumns = (handleDelete, openEditModal) => [
  {
    title: "Τίτλος",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
    width: 300,
  },

  {
    title: "Κατάσταση",
    dataIndex: "isActive",
    key: "isActive",
    ellipsis: true,
    width: 50,
    render: (text, ticket) => (
      <div
        className={`w-5 h-5 rounded-full transition-opacity duration-300 ${
          ticket.isActive
            ? "bg-green-500 animate-pulse"
            : "bg-red-500 animate-pulse"
        }`}
      />
    ),
  },
  {
    title: "Ενέργειες",
    dataIndex: "actions",
    key: "actions",
    width: 50,
    render: (text, banner) => (
      <div className="flex items-center jus gap-2">
        <Button
          title="Επεξεργασία"
          icon={<AiOutlineEdit size={20} />}
          onClick={() => openEditModal(banner)}
        />
        <Button
          title="Διαγραφή"
          onClick={() => handleDelete(banner._id)}
          danger
          icon={<AiOutlineDelete size={20} />}
        />
      </div>
    ),
  },
];

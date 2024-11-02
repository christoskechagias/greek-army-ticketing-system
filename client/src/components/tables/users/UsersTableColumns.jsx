import React from "react";
import { Button } from "antd";
import { AiOutlineEdit, AiOutlineLock, AiOutlineDelete } from "react-icons/ai";

export const getColumns = (handleDelete, navigate) => [
  {
    title: "Ονοματεπώνυμο",
    dataIndex: "name",
    key: "name",
    render: (text, user) =>
      `${user.rank} (${user.brand}) ${user.firstName} ${user.lastName}`,
    ellipsis: true,
    width: 300,
  },
  {
    title: "'Ονομα χρήστη",
    dataIndex: "userName",
    key: "userName",
    ellipsis: true,
  },

  {
    title: "Ρόλος",
    dataIndex: "role",
    key: "role",
    render: (text, user) => {
      return user?.roles?.map((role) => <p>{role}</p>);
    },
    ellipsis: true,
    width: 130,
  },
  {
    title: "Ενέργειες",
    dataIndex: "actions",
    key: "actions",
    width: 150,
    render: (text, user) => (
      <div className="flex items-center jus gap-2">
        <Button
          title="Επεξεργασία στοιχείων χρήστη"
          icon={<AiOutlineEdit size={20} />}
          onClick={() => navigate(`/admin/users/${user._id}/update`)}
        />
        <Button
          title="Αλλαγή κωδικού πρόσβασης χρήστη"
          icon={<AiOutlineLock size={20} />}
          onClick={() => navigate(`/admin/users/${user._id}/password/update`)}
        />
        <Button
          title="Διαγραφή χρήστη"
          onClick={() => handleDelete(user.key)}
          disabled={user.isAdmin}
          danger
          icon={<AiOutlineDelete size={20} />}
        />
      </div>
    ),
  },
];

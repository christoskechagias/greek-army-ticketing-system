import React from "react";
import { Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteUser,
  fetchUsers,
} from "../../../redux/features/admin/actions/userActions";
import { getColumns } from "./UsersTableColumns";
import { AiOutlineDelete } from "react-icons/ai";

function UsersTable() {
  const pageSize = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, totalUsers, loadingUsers } = useSelector(
    (state) => state.admin
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search_query") || "";

  const handleDelete = (key) => {
    Modal.confirm({
      icon: (
        <AiOutlineDelete style={{ color: "red" }} className="mr-2" size={25} />
      ),
      title: "Διαγραφή χρήστη",
      content: "Είσαι σίγουρος για την διαγραφή του χρήστη;",
      okText: "Ναι",
      okType: "danger",
      cancelText: "Όχι",
      onOk: () => {
        dispatch(deleteUser(key))
          .then(() => {
            dispatch(
              fetchUsers({ current: currentPage, pageSize: 10 }, searchQuery)
            );
          })
          .catch((error) => console.log(error));
      },
    });
  };

  return (
    <Table
      size="small"
      bordered
      loading={loadingUsers}
      columns={getColumns(handleDelete, navigate)}
      dataSource={users?.map((user) => ({ ...user, key: user._id }))}
      pagination={{
        current: Number(searchParams.get("page")) || 1,
        pageSize,
        total: totalUsers,
        onChange: (page) => {
          setSearchParams({ page });
        },
      }}
      locale={{
        filterReset: "Καθαρισμός",
        emptyText: <p className="text-lg">Δεν υπάρχουν χρήστες</p>,
      }}
    />
  );
}

export default UsersTable;

import React, { useEffect } from "react";
import { Table } from "antd";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getColumns } from "./TicketsTableColumns";
import { fetchTicketCategories } from "../../../redux/features/app/appActions";

function TicketsTable({
  loading,
  tickets,
  totalTickets,
  pageSize = 10,
  onRowClick,
  hasSelectionBox = false,
  selectedRowKeys,
  onSelectChange,
  showExtraColumns,
}) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { ticketCategories: categories } = useSelector((state) => state.app);
  const defaultCategoryFilters =
    searchParams.get("categories")?.split(",") || [];
  const defaultStatusFilter = searchParams.get("status")?.split(",") || [];

  useEffect(() => {
    dispatch(fetchTicketCategories());
  }, [dispatch]);

  const onChange = (pagination, filters) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", pagination.current);

      if (filters.category && filters.category.length > 0) {
        newParams.set("categories", filters.category.join(","));
      } else {
        newParams.delete("categories");
      }

      if (filters.status && filters.status.length > 0) {
        newParams.set("status", filters.status.join(","));
      } else {
        newParams.delete("status");
      }

      return newParams;
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      bordered
      size="small"
      loading={loading}
      dataSource={tickets.map((ticket) => ({
        ...ticket,
        key: ticket._id,
      }))}
      onChange={onChange}
      rowSelection={hasSelectionBox && { columnWidth: 15, ...rowSelection }}
      columns={getColumns(
        categories,
        defaultCategoryFilters,
        defaultStatusFilter,
        showExtraColumns
      )}
      pagination={{
        current: Number(searchParams.get("page")) || 1,
        pageSize,
        total: totalTickets,
      }}
      onRow={(ticket) => ({
        onClick: (e) => {
          if (
            e.target.className ===
            "ant-table-cell ant-table-selection-column ant-table-cell-row-hover"
          ) {
          } else {
            onRowClick(ticket);
          }
        },
        className: `cursor-pointer ${
          ticket.hasUnreadeadComments ? "bg-gray-200" : ""
        }`,
      })}
      locale={{
        filterReset: "Καθαρισμός",
        emptyText: <p className="text-lg">Δεν υπάρχουν tickets</p>,
      }}
    />
  );
}

export default TicketsTable;

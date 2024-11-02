import React from "react";
import { Tooltip } from "antd";
import moment from "moment";
import { BsClipboardPulse } from "react-icons/bs";
import { getStatusByKey, statusItems } from "../../ticketStatus";

export const getColumns = (
  categories,
  defaultCategoryFilters,
  defaultStatusFilter,
  showExtraColumns
) => {
  const commonColumns = [
    {
      title: "ID",
      dataIndex: "ticketId",
      key: "ticketId",
      ellipsis: true,
      width: 30,
      filteredValue: null,
    },
    {
      title: "Θέμα",
      dataIndex: "subject",
      key: "subject",
      render: (text, ticket) => `${ticket.subject} `,
      ellipsis: true,
      width: 60,
    },
    {
      title: "Κατηγορία",
      dataIndex: "category",
      key: "category",
      ellipsis: true,
      width: 60,
      filters: categories.map((category) => ({
        text: category.title,
        value: category._id,
      })),
      filteredValue: defaultCategoryFilters,
    },

    {
      title: (
        <p className="whitespace-normal w-[120px]">Ημερομηνία δημιουργίας</p>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
      width: 30,
      filteredValue: null,
      render: (text, ticket) => (
        <div className="flex flex-col">
          <p>{moment(ticket.createdAt).format("h:mm a")}</p>
          <p className="overflow-hidden text-ellipsis">
            {moment(ticket.createdAt).format("DD/MM/YYYY")}
          </p>
        </div>
      ),
    },
    {
      title: <BsClipboardPulse size={25} />,
      dataIndex: "status",
      key: "status",
      width: 13,
      filters: statusItems.map((item) => ({
        text: item.title,
        value: item.key,
      })),
      filteredValue: defaultStatusFilter,
      render: (text, ticket) => {
        const status = getStatusByKey(ticket.status);
        let tooltipText = status?.title;
        let icon = status?.icon;
        return (
          <Tooltip placement="bottom" title={tooltipText}>
            {icon}
          </Tooltip>
        );
      },
    },
  ];

  const extraColumns = [
    {
      title: "Ανατέθηκε",
      dataIndex: "assignee",
      key: "assignee",
      render: (text, ticket) => {
        return ticket && ticket?.assignee?.id ? (
          <p>
            {ticket?.assignee?.rank +
              " (" +
              ticket?.assignee?.brand +
              ") " +
              ticket?.assignee?.firstName +
              " " +
              ticket?.assignee?.lastName}
          </p>
        ) : (
          <p>-</p>
        );
      },
      width: 30,
    },
    {
      title: "Δημιουργός",
      dataIndex: "author",
      key: "author",
      render: (text, ticket) => {
        return ticket && ticket?.author?.id ? (
          <p>
            {ticket?.author?.rank +
              " (" +
              ticket?.author?.brand +
              ") " +
              ticket?.author?.firstName +
              " " +
              ticket?.author?.lastName}
          </p>
        ) : (
          <p>-</p>
        );
      },
      width: 30,
    },
  ];

  return showExtraColumns ? [...commonColumns, ...extraColumns] : commonColumns;
};

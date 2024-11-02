import { Skeleton, Table, Tooltip } from "antd";
import React, { useEffect } from "react";
import { getStatusByKey } from "../../ticketStatus";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchMembersStats } from "../../../redux/features/member/actions/ticketActions";
import { RiArchive2Line } from "react-icons/ri";

function MemberStats() {
  const { membersStats, loadingMembersStats } = useSelector(
    (state) => state.member
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMembersStats());
  }, [dispatch]);

  const columns = [
    {
      title: "Ονοματεπώνυμο",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: <p>Μηνιαία Tickets ({moment().format("MMMM")})</p>,
      key: "monthlyTickets",
      align: "center",
      children: [
        {
          title: (
            <Tooltip
              className="m-auto"
              title={getStatusByKey("inProgress").title}
            >
              {getStatusByKey("inProgress").icon}
            </Tooltip>
          ),
          dataIndex: `inProgressTicketsAllTime`,
          key: `inProgressTicketsAllTime`,
          align: "center",
        },
        {
          title: (
            <Tooltip
              className="m-auto"
              title={getStatusByKey("completed").title}
            >
              {getStatusByKey("completed").icon}
            </Tooltip>
          ),
          dataIndex: `completedTicketsCurrentMonth`,
          key: `completedTicketsCurrentMonth`,
          align: "center",
        },
      ],
    },
    {
      title: "Συνολικά",
      dataIndex: "completedTicketsAllTime",
      key: "completedTicketsAllTime",
      align: "center",
    },
  ];

  if (loadingMembersStats) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }
  return (
    <Table
      bordered
      columns={columns}
      size="medium"
      dataSource={membersStats}
      pagination={false}
      locale={{
        emptyText: (
          <div className="flex flex-col items-center justify-center">
            <RiArchive2Line size={30} />
            <p className="text-sm">Δεν υπάρχουν στατιστικά μελών</p>
          </div>
        ),
      }}
    />
  );
}

export default MemberStats;

import React, { useEffect } from "react";
import TicketStatisticCard from "./TicketStatisticCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodayTicketsStats } from "../../../redux/features/member/actions/ticketActions";
import ApexCharts from "react-apexcharts";
import { Skeleton } from "antd";

function TicketsStatsToday() {
  const dispatch = useDispatch();
  const { todayTicketsStats, loadingTodayTicketsStats } = useSelector(
    (state) => state.member
  );
  const status = [
    { title: "ΑΝΟΙΧΤΑ", style: "from-blue-300 to-blue-500" },
    {
      title: "ΣΕ ΕΞΕΛΙΞΗ",
      style: "from-yellow-300 to-yellow-500",
    },
    {
      title: "ΟΛΟΚΛΗΡΩΜΕΝΑ",
      style: "from-green-300 to-green-500",
    },
  ];

  useEffect(() => {
    dispatch(fetchTodayTicketsStats());
  }, [dispatch]);

  const chartOptions = {
    labels: [status[0].title, status[1].title, status[2].title],
    colors: ["#5293F8", "#EEBC14", "#40CF69"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
      style: {
        fontSize: "25px",
      },
    },
  };

  if (loadingTodayTicketsStats) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  return (
    <div className="flex gap-3 items-center w-full">
      <div className="flex flex-col gap-3 w-full">
        <TicketStatisticCard
          status={status[0]}
          value={todayTicketsStats.openTickets || "0"}
        />
        <TicketStatisticCard
          status={status[1]}
          value={todayTicketsStats.inProgressTickets || "0"}
        />

        <TicketStatisticCard
          status={status[2]}
          value={todayTicketsStats.completedTickets || "0"}
        />
      </div>

      <ApexCharts
        options={chartOptions}
        series={[
          Number(todayTicketsStats.openTickets) || 0,
          Number(todayTicketsStats.inProgressTickets) || 0,
          Number(todayTicketsStats.completedTickets) || 0,
        ]}
        type="pie"
        width="400"
      />
    </div>
  );
}

export default TicketsStatsToday;

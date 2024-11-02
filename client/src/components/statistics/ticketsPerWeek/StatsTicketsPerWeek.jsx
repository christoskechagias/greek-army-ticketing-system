import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexCharts from "react-apexcharts";
import { DatePicker, Skeleton } from "antd";
import dayjs from "dayjs";
import { fetchTicketsByWeek } from "../../../redux/features/member/actions/ticketActions";
import locale from "antd/es/date-picker/locale/el_GR";

const StatsTicketsPerWeek = () => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("week"));
  const { ticketsByWeek, loadingTicketsByWeek } = useSelector(
    (state) => state.member
  );

  useEffect(() => {
    const startOfWeek = selectedDate.startOf("week").format("YYYY-MM-DD");
    const endOfWeek = selectedDate.endOf("week").format("YYYY-MM-DD");
    dispatch(fetchTicketsByWeek(startOfWeek, endOfWeek));
  }, [dispatch, selectedDate]);

  useEffect(() => {
    if (ticketsByWeek) {
      setChartData(ticketsByWeek);
    }
  }, [ticketsByWeek]);

  const options = {
    colors: ["#5293F8", "#EEBC14", "#40CF69"],
    chart: {
      type: "bar",
      stacked: true,
    },
    xaxis: {
      categories: [
        "Κυριακή",
        "Δευτέρα",
        "Τρίτη",
        "Τετάρτη",
        "Πέμπτη",
        "Παρασκευή",
        "Σάββατο",
      ],
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    legend: {
      position: "top",
    },
  };

  const weekFormat = (date) => {
    const startOfWeek = dayjs(date).startOf("week").format("DD/MM/YYYY");
    const endOfWeek = dayjs(date).endOf("week").format("DD/MM/YYYY");
    return `${startOfWeek} - ${endOfWeek}`;
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  if (loadingTicketsByWeek) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <DatePicker
        onChange={handleDateChange}
        picker="week"
        value={selectedDate}
        format={weekFormat}
        placeholder="Επιλέξτε εβδομάδα"
        locale={locale}
      />
      <div className="w-full">
        <ApexCharts
          height={400}
          options={options}
          series={chartData}
          type="bar"
        />
      </div>
    </div>
  );
};

export default StatsTicketsPerWeek;

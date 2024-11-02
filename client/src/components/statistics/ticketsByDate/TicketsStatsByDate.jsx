import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexCharts from "react-apexcharts";
import dayjs from "dayjs";
import { DatePicker, Skeleton } from "antd";
import { fetchTicketsByDate } from "../../../redux/features/member/actions/ticketActions";
import locale from "antd/es/date-picker/locale/el_GR";

function TicketsStatsByDate() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { ticketsByDate, loadingTicketsByDate } = useSelector(
    (state) => state.member
  );

  const [series, setSeries] = useState([
    {
      name: "Κίνηση ανά ημέρα",
      data: [],
    },
  ]);

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchTicketsByDate(selectedDate));
    }
  }, [dispatch, selectedDate]);

  useEffect(() => {
    if (ticketsByDate && ticketsByDate.length > 0) {
      setSeries(ticketsByDate);
    }
  }, [ticketsByDate]);

  const options = {
    chart: {
      type: "bar",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
      },
    },
    xaxis: {
      categories: [
        "07:00 π.μ.",
        "08:00 π.μ.",
        "09:00 π.μ.",
        "10:00 π.μ.",
        "11:00 π.μ.",
        "12:00 μ.μ.",
        "13:00 μ.μ.",
        "14:00 μ.μ.",
        "15:00 μ.μ.",
      ],
    },
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  if (loadingTicketsByDate) {
    return <Skeleton active paragraph={{ rows: 10 }} />;
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <DatePicker
        onChange={handleDateChange}
        value={selectedDate}
        placeholder="Επέλεξε ημέρα"
        locale={locale}
        format="DD/MM/YYYY"
      />
      <div className="w-full">
        <ApexCharts height={400} options={options} series={series} type="bar" />
      </div>
    </div>
  );
}

export default TicketsStatsByDate;

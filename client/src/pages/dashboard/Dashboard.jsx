import React from "react";
import StatsTicketsPerWeek from "../../components/statistics/ticketsPerWeek/StatsTicketsPerWeek";
import TicketsStatsByDate from "../../components/statistics/ticketsByDate/TicketsStatsByDate";
import TicketsStatsToday from "../../components/statistics/ticketsToday/TicketsStatsToday";
import MemberStats from "../../components/statistics/members/MemberStats";
import ContentWrapper from "../../components/layout/content/ContentWrapper";

const StatisticsSection = ({ title, children }) => (
  <ContentWrapper>
    <p className="font-bold text-xl mb-2 ">{title}</p>
    {children}
  </ContentWrapper>
);

function Dashboard() {
  return (
    <div className="flex flex-col w-full gap-3 h-full">
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        <StatisticsSection title="Σήμερα">
          <TicketsStatsToday />
        </StatisticsSection>
        <StatisticsSection title="Στατιστικά μελών ΓΕΠ">
          <MemberStats />
        </StatisticsSection>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        <StatisticsSection title="Δημοφιλείς ώρες">
          <TicketsStatsByDate />
        </StatisticsSection>
        <StatisticsSection title="Ανά εβδομάδα">
          <StatsTicketsPerWeek />
        </StatisticsSection>
      </div>
    </div>
  );
}

export default Dashboard;

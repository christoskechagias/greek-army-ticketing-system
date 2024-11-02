import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchTickets } from "../../../redux/features/member/actions/ticketActions";
import TicketsTable from "../../../components/tables/tickets/TicketsTable";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";

function AllTickets() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { totalTickets, tickets, loadingTickets } = useSelector(
    (state) => state.member
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search_query") || "";
  const categoriesQuery = searchParams.get("categories") || "";
  const statusQuery = searchParams.get("status") || "";

  useEffect(() => {
    dispatch(
      fetchTickets({ current: currentPage, pageSize: 10 }, searchQuery, {
        categories: categoriesQuery,
        status: statusQuery,
      })
    );
  }, [dispatch, currentPage, searchQuery, categoriesQuery, statusQuery]);

  const onRowClick = (record) => {
    navigate(`/member/tickets/${record._id}/update`);
  };

  return (
    <ContentWrapper>
      <TicketsTable
        loading={loadingTickets}
        tickets={tickets}
        totalTickets={totalTickets}
        onRowClick={onRowClick}
        showExtraColumns={true}
      />
    </ContentWrapper>
  );
}

export default AllTickets;

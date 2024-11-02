import React, { useEffect } from "react";
import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../../redux/features/user/actions/ticketActions";
import TicketsTable from "../../../components/tables/tickets/TicketsTable";
import SearchColumns from "../../../components/tables/SearchColumns";
import { IoTicketOutline } from "react-icons/io5";

function MyTickets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalTickets, tickets, loadingTickets } = useSelector(
    (state) => state.user
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
    navigate(`/tickets/${record._id}/update`);
  };
  return (
    <ContentWrapper customStyle="flex flex-col gap-3 h-full">
      <div className="flex gap-3">
        <Button type="primary" onClick={() => navigate("/tickets/create")}>
          <IoTicketOutline size={20} />
          Δημιουργία ticket
        </Button>
        <SearchColumns
          searchQuery={searchQuery}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </div>

      <TicketsTable
        loading={loadingTickets}
        tickets={tickets}
        totalTickets={totalTickets}
        onRowClick={onRowClick}
      />
    </ContentWrapper>
  );
}

export default MyTickets;

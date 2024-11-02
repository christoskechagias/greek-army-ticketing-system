import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import {
  fetchTickets,
  deleteManyTickets,
} from "../../../redux/features/admin/actions/ticketActions";
import TicketsTable from "../../../components/tables/tickets/TicketsTable";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";
import { AiOutlineDelete } from "react-icons/ai";
import SearchColumns from "../../../components/tables/SearchColumns";

function AllTickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalTickets, tickets, loadingTickets } = useSelector(
    (state) => state.admin
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search_query") || "";
  const categoriesQuery = searchParams.get("categories") || "";
  const statusQuery = searchParams.get("status") || "";

  useEffect(() => {
    handleFetchTickets();
  }, [dispatch, currentPage, searchQuery, categoriesQuery, statusQuery]);

  const deleteTicketHandler = () => {
    dispatch(deleteManyTickets(selectedRowKeys));
    setSelectedRowKeys([]);
    handleFetchTickets();
  };

  const onRowClick = (record) => {
    navigate(`/admin/tickets/${record._id}/update`);
  };

  const handleFetchTickets = () => {
    dispatch(
      fetchTickets({ current: currentPage, pageSize: 10 }, searchQuery, {
        categories: categoriesQuery,
        status: statusQuery,
      })
    );
  };

  return (
    <ContentWrapper customStyle="flex flex-col gap-3 h-full">
      <div className="flex justify-between">
        <SearchColumns
          searchQuery={searchQuery}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />

        <Button
          onClick={deleteTicketHandler}
          disabled={selectedRowKeys.length === 0}
          danger
        >
          <AiOutlineDelete size={20} /> Διαγραφή
        </Button>
      </div>

      <TicketsTable
        loading={loadingTickets}
        tickets={tickets}
        totalTickets={totalTickets}
        hasSelectionBox
        deleteTicketHandler={deleteTicketHandler}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={setSelectedRowKeys}
        onRowClick={onRowClick}
        showExtraColumns={true}
      />
    </ContentWrapper>
  );
}

export default AllTickets;

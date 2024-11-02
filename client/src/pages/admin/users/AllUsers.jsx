import React, { useEffect } from "react";
import UsersTable from "../../../components/tables/users/UsersTable";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";
import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchUsers } from "../../../redux/features/admin/actions/userActions";
import { useDispatch } from "react-redux";
import SearchColumns from "../../../components/tables/SearchColumns";
import { PiUserPlus } from "react-icons/pi";

function AllUsers() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search_query") || "";

  useEffect(() => {
    dispatch(fetchUsers({ current: currentPage, pageSize: 10 }, searchQuery));
  }, [dispatch, currentPage, searchQuery]);

  return (
    <ContentWrapper customStyle="flex flex-col gap-3 h-full">
      <div className="flex gap-2">
        <Button
          className="mb-2"
          type="primary"
          onClick={() => navigate("/admin/users/new")}
        >
          <PiUserPlus size={20} />
          Δημιουργία χρήστη
        </Button>
        <SearchColumns
          searchQuery={searchQuery}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </div>

      <UsersTable />
    </ContentWrapper>
  );
}

export default AllUsers;

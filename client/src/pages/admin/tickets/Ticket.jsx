import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../../redux/features/user/actions/commentActions";
import { useParams } from "react-router-dom";
import TicketDetails from "../../../components/ticket/TicketDetails";
import Comments from "../../../components/comments/Comments";
import AuthorDetails from "../../../components/ticket/AuthorDetails";
import AssigneeDetails from "../../../components/ticket/AssigneeDetails";
import TicketAdminActions from "../../../components/ticket/TicketAdminActions";
import { fetchTicket } from "../../../redux/features/admin/actions/ticketActions";
import { fetchMembers } from "../../../redux/features/admin/actions/memberActions";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";
import { Skeleton } from "antd";

function Ticket() {
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const { loadingTicket, ticket } = useSelector((state) => state.admin);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (ticketId) {
      dispatch(fetchMembers());
      dispatch(fetchTicket(ticketId));
      dispatch(fetchComments(ticketId));
      setInitialLoad(false);
    }
  }, [dispatch, ticketId]);

  return (
    <div className="flex gap-3 h-full w-full">
      <ContentWrapper customStyle="flex flex-col gap-3">
        {loadingTicket ? (
          <Skeleton active paragraph={{ rows: 22 }} />
        ) : (
          <Fragment>
            <div className="flex justify-between items-center rounded-lg border-b p-3">
              <p className="text-xl font-semibold">
                Ticket ID:{" "}
                <span className="font-bold"> {ticket?.ticketId}</span>
              </p>
              <TicketAdminActions ticket={ticket} />
            </div>
            <TicketDetails ticket={ticket} />
            <AuthorDetails author={ticket.author} />
            <AssigneeDetails assignee={ticket.assignee} />
          </Fragment>
        )}
      </ContentWrapper>

      <Comments ticket={ticket} initialLoad={initialLoad} />
    </div>
  );
}

export default Ticket;

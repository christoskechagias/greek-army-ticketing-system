import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TicketDetails from "../../../components/ticket/TicketDetails";
import Comments from "../../../components/comments/Comments";
import AuthorDetails from "../../../components/ticket/AuthorDetails";
import AssigneeDetails from "../../../components/ticket/AssigneeDetails";
import TicketMemberActions from "../../../components/ticket/TicketMemberActions";
import { fetchTicket } from "../../../redux/features/member/actions/ticketActions";
import { fetchComments } from "../../../redux/features/user/actions/commentActions";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";
import { Skeleton } from "antd";

function Ticket() {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const { loadingTicket, ticket } = useSelector((state) => state.member);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (ticketId) {
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
              <TicketMemberActions ticket={ticket} />
            </div>
            <TicketDetails ticket={ticket} />
            <AuthorDetails author={ticket.author} />
            <AssigneeDetails assignee={ticket.assignee} />
          </Fragment>
        )}
      </ContentWrapper>

      <Comments
        ticket={ticket}
        isChatInputOpen={ticket.isAssignee}
        initialLoad={initialLoad}
      />
    </div>
  );
}

export default Ticket;

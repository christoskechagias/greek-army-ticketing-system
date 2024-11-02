import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTicket } from "../../../redux/features/user/actions/ticketActions";
import { fetchComments } from "../../../redux/features/user/actions/commentActions";
import Comments from "../../../components/comments/Comments";
import AuthorDetails from "../../../components/ticket/AuthorDetails";
import TicketDetails from "../../../components/ticket/TicketDetails";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";
import { Skeleton } from "antd";

function Ticket() {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const { loadingTicket, ticket } = useSelector((state) => state.user);
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
            <p className="text-xl font-semibold">
              Ticket ID: <span className="font-bold"> {ticket?.ticketId}</span>
            </p>
            <TicketDetails ticket={ticket} />
            <AuthorDetails author={ticket.author} />
          </Fragment>
        )}
      </ContentWrapper>

      <Comments ticket={ticket} initialLoad={initialLoad} />
    </div>
  );
}

export default Ticket;

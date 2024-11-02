import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  fetchComments,
} from "../../redux/features/user/actions/commentActions";
import ChatInput from "./ChatInput";
import CommentList from "./CommentList";
import { isTicketStatus } from "../ticketStatus";
import ContentWrapper from "../layout/content/ContentWrapper";
import { Skeleton } from "antd";

function Comments({ ticket, initialLoad, isChatInputOpen = true }) {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const [manualScrolling, setManualScrolling] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const { comments, loadingComments } = useSelector((state) => state.user);

  const onFinish = (values) => {
    const formData = new FormData();

    if (values.comment) {
      formData.append("text", values.comment);
    }
    formData.append("ticketId", ticketId);

    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
    }

    dispatch(createComment(formData));
    setManualScrolling(false);
  };

  useEffect(() => {
    if (comments) {
      setCommentsList(comments);
    }
  }, [comments]);

  useEffect(() => {
    if (ticketId && ticket && ticket.status !== "completed") {
      const intervalId = setInterval(() => {
        dispatch(fetchComments(ticketId));
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, ticketId, ticket]);

  return (
    <ContentWrapper customStyle="!p-0 overflow-hidden sticky top-[60px] h-[calc(95vh-40px)]">
      {loadingComments && initialLoad ? (
        <Skeleton className="p-3" active paragraph={{ rows: 22 }} />
      ) : (
        <div className="flex flex-col h-full">
          <h1 className="text-xl border-b font-bold p-3">Σχόλια</h1>
          <CommentList
            comments={commentsList}
            manualScrolling={manualScrolling}
            setManualScrolling={setManualScrolling}
          />
          <ChatInput
            isActive={
              (isTicketStatus(ticket.status, "open") ||
                isTicketStatus(ticket.status, "inProgress")) &&
              isChatInputOpen
            }
            onFinish={onFinish}
          />
        </div>
      )}
    </ContentWrapper>
  );
}

export default Comments;

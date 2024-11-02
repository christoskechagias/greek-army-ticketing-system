import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../../redux/features/user/actions/ticketActions";
import { resetState } from "../../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import TicketForm from "../../../components/forms/TicketForm";
import { fetchTicketCategories } from "../../../redux/features/app/appActions";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";
import { Skeleton } from "antd";

function NewTicket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadingTicket } = useSelector((state) => state.user);
  const { loadingTicketCategories } = useSelector((state) => state.app);

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("subject", values.subject);
    formData.append("description", values.description);
    formData.append("category", values.category);

    if (values?.images && values.images.length > 0) {
      values?.images?.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
    }

    dispatch(createTicket(formData))
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error creating ticket:", error);
      });
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(fetchTicketCategories());
  }, [dispatch]);

  return (
    <ContentWrapper title="Δημιουργία ticket" customStyle="h-full">
      {loadingTicketCategories || loadingTicket ? (
        <Skeleton className="w-[700px]" paragraph={{ rows: 16 }} active />
      ) : (
        <TicketForm onFinish={onFinish} />
      )}
    </ContentWrapper>
  );
}

export default NewTicket;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/features/admin/actions/userActions";
import { useNavigate } from "react-router-dom";
import UserForm from "../../../components/forms/UserForm";
import { resetState } from "../../../redux/features/admin/adminSlice";
import {
  fetchBrands,
  fetchOffices,
  fetchRanks,
  fetchRoles,
} from "../../../redux/features/app/appActions";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";

function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(createUser(values))
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchOffices());
    dispatch(fetchBrands());
    dispatch(fetchRanks());
  }, [dispatch]);

  return (
    <ContentWrapper customStyle="h-full">
      <p className="text-lg font-semibold">Δημιουργία χρήστη</p>
      <UserForm onFinish={onFinish} />
    </ContentWrapper>
  );
}

export default CreateUser;

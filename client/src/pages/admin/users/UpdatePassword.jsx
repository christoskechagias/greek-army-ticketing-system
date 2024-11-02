import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserPassword } from "../../../redux/features/admin/actions/userActions";
import PasswordForm from "../../../components/forms/PasswordForm";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";

function UpdatePassword() {
  const { userId } = useParams();
  const { loadingUser } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(updateUserPassword({ _id: userId, password: values.newPassword }))
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loadingUser) {
    return <LoadingSpinner />;
  }
  return (
    <ContentWrapper customStyle="h-full">
      <p className="text-lg font-semibold">Ενημέρωση κωδικού χρήστη</p>
      <PasswordForm onFinish={onFinish} />
    </ContentWrapper>
  );
}

export default UpdatePassword;

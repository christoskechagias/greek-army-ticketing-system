import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import {
  updateUser,
  fetchUser,
} from "../../../redux/features/admin/actions/userActions";
import {
  fetchBrands,
  fetchOffices,
  fetchRanks,
  fetchRoles,
} from "../../../redux/features/app/appActions";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../../../components/forms/UserForm";
import ContentWrapper from "../../../components/layout/content/ContentWrapper";

function UpdateUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loadingUser } = useSelector((state) => state.admin);
  const { loadingRoles, loadingRanks, loadingBrands, loadingOffices } =
    useSelector((state) => state.app);

  const onFinish = (values) => {
    dispatch(updateUser({ ...values, _id: userId }))
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
    dispatch(fetchOffices());
    dispatch(fetchRoles());
    dispatch(fetchBrands());
    dispatch(fetchRanks());
  }, [dispatch, userId]);

  return (
    <ContentWrapper customStyle="h-full">
      {loadingRoles ||
      loadingRanks ||
      loadingBrands ||
      loadingOffices ||
      loadingUser ? (
        <Skeleton className="w-[700px]" paragraph={{ rows: 14 }} active />
      ) : (
        <>
          <p className="text-lg font-semibold">
            Ενημέρωση του χρήστη
            <span className="font-bold"> {user.userName}</span>
          </p>
          <UserForm onFinish={onFinish} isUpdate={true} />
        </>
      )}
    </ContentWrapper>
  );
}

export default UpdateUser;

import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../redux/features/alert/alertSlice";

function AlertMessage() {
  const dispatch = useDispatch();
  const { type, message } = useSelector((state) => state.alert);

  useEffect(() => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
    dispatch(resetState());
  }, [dispatch, type, message]);

  return <ToastContainer position="top-center" />;
}
export default AlertMessage;

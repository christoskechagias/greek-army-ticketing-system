import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import appReducer from "./features/app/appSlice";
import alertReducer from "./features/alert/alertSlice";
import adminReducer from "./features/admin/adminSlice";
import memberReducer from "./features/member/memberSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    alert: alertReducer,
    admin: adminReducer,
    member: memberReducer,
    user: userReducer,
  },
});
export default store;

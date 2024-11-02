import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.js";
import store from "./redux/store";
import { Provider } from "react-redux";
import AlertMessage from "./components/AlertMessage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <AlertMessage />
  </Provider>
);

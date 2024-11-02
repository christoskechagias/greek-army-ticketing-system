import axios from "axios";
import Cookies from "js-cookie";

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  function (config) {
    const idToken = Cookies.get("id_token");
    if (idToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${idToken}`,
        Accept: "application/json",
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosApiInstance;

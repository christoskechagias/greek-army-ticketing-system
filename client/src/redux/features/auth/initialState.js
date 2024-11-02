import Cookies from "js-cookie";

const initialState = {
  loading: false,
  idToken: Cookies.get("id_token"),
  error: "",
  profile: {},
};

export default initialState;

import { logout } from "../reducers/users/userInfoSlice";

export const authHeaderConfig = (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: "Bearer " + userInfo?.token,
    },
  };
  const logoutWithStatus = (errorStatus, withStatus = 401) =>
    errorStatus === withStatus ? dispatch(logout()) : false;
  return { config, logoutWithStatus };
};

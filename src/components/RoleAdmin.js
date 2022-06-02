import React from "react";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../reducers/users/userInfoSlice";

export default function RoleAdmin({ children }) {
  const { value: userInfo } = useSelector(userInfoSelector);
  return <>{userInfo?.role === "admin" ? <>{children}</> : null}</>;
}

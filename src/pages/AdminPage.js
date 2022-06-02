import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { userInfoSelector } from "../reducers/users/userInfoSlice";

export default function AdminPage() {
  const navigate = useNavigate();
  const { value: userInfo } = useSelector(userInfoSelector);
  useEffect(() => {
    if (!userInfo?.role === "admin") {
      navigate("/");
    }
  }, [navigate, userInfo?.role]);
  return (
    <>
      <Outlet />
    </>
  );
}

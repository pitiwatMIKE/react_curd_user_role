import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout, setUseInfo } from "../reducers/users/userInfoSlice";
import Header from "./Header";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  // get user from localStrage when references page
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.token) {
      dispatch(setUseInfo(userInfo));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container className="mt-2">{children}</Container>;
    </>
  );
}

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userInfoSelector } from "../reducers/users/userInfoSlice";

function DashboardPage() {
  const { value: userInfo } = useSelector(userInfoSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  });
  return (
    <>
      <ul>
        <div>DashboardPage</div>
        <li>
          <Link to="/dashboard">DashBoard</Link>
        </li>
        <li>
          <Link to="myproducts">MyProducs</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default DashboardPage;

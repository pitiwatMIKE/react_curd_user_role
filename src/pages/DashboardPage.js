import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { userInfoSelector } from "../reducers/users/userInfoSlice";

function DashboardPage() {
  const { value: userInfo } = useSelector(userInfoSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <Nav variant="pills" defaultActiveKey="myproducts">
        <Nav.Item>
          <NavLink className="nav-link" to="myproducts">
            MyPorducts
          </NavLink>
        </Nav.Item>
      </Nav>
      <Outlet />
    </>
  );
}

export default DashboardPage;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { userInfoSelector } from "../reducers/users/userInfoSlice";
import RoleAdmin from "../components/RoleAdmin";

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
      <Nav variant="pills" defaultActiveKey="/dashboard/myproducts">
        <Nav.Item>
          <NavLink className="nav-link" to="/dashboard/myproducts">
            MyPorducts
          </NavLink>
        </Nav.Item>
        <RoleAdmin>
          <Nav.Item>
            <NavLink className="nav-link" to="/dashboard/admin/users">
              Users
            </NavLink>
          </Nav.Item>
        </RoleAdmin>
      </Nav>
      <Outlet />
    </>
  );
}

export default DashboardPage;

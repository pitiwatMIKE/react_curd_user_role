import React from "react";
import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout, userInfoSelector } from "../reducers/users/userInfoSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value: userInfo } = useSelector(userInfoSelector);

  const Logout = () => (
    <Row className="align-items-center">
      <Col md={12} lg="auto">
        <div style={{ color: "#ffff" }}>Name: {userInfo.user}</div>
      </Col>
      <Col>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Col>
    </Row>
  );

  const Login = () => (
    <div>
      <Button onClick={() => navigate("/login")} variant="secondary">
        Login
      </Button>
      <Button onClick={() => navigate("/register")} variant="secondary">
        Register
      </Button>
    </div>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">CRUD-ReacApp</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>

              <NavLink className="nav-link" to="/about">
                About
              </NavLink>

              <NavLink className="nav-link" to="/dashboard/myproducts">
                DashBoard
              </NavLink>
            </Nav>
            <div>{userInfo ? <Logout /> : <Login />}</div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

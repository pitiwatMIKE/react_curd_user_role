import React from "react";
import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userInfoSelector } from "../reducers/users/userInfoSlice";

export default function Header() {
  const navigate = useNavigate();
  const { value: userInfo } = useSelector(userInfoSelector);

  const Logout = () => (
    <Row className="align-items-center">
      <Col>
        <div style={{ color: "#ffff" }}>{userInfo.user}</div>
      </Col>
      <Col>
        <Button
          variant="secondary"
          onClick={() => {
            localStorage.removeItem("userInfo");
            window.location.href = "/";
            // navigate("/")
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
              <Link className="nav-link" to="/">
                Home
              </Link>

              <Link className="nav-link" to="/about">
                About
              </Link>

              <Link className="nav-link" to="/dashboard">
                DashBoard
              </Link>
            </Nav>
            <div>{userInfo ? <Logout /> : <Login />}</div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

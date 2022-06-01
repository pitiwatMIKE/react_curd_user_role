import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { register, userInfoSelector } from "../reducers/users/userInfoSlice";

const initState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [validated, setValidated] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [user, setUser] = useState(initState);
  const dispatch = useDispatch();
  const { loading, error, errorMessage, value: userInfo } = useSelector(userInfoSelector);

  const handlerChange = (e) => {
    let { name, value } = e.target;
    return (() => {
      setUser({ ...user, [name]: value });
    })();
  };

  const checkForm = (event) => {
    const form = event.currentTarget;
    let status = true;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      status = false;
    }
    setValidated(true);
    return status;
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (checkForm(event)) {
      if (user.password === user.confirmPassword) {
        setNotMatch(false);
        dispatch(register(user));
      } else {
        setNotMatch(true);
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  return (
    <div
      style={{ maxWidth: 700 }}
      className=" mt-5 mx-auto py-4 px-5 border rounded shadow-sm"
    >
      <h2 className="mb-4">Register</h2>
      {error && <Error msg={errorMessage} />}
      <Form noValidate validated={validated} onSubmit={handlerSubmit}>
        <Row>
          <Col md={12} lg={6}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstname"
                onChange={handlerChange}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastname"
                onChange={handlerChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handlerChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlerChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handlerChange}
            required
          />
          {notMatch && (
            <small style={{ color: "#f00" }}>not match password</small>
          )}
        </Form.Group>

        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

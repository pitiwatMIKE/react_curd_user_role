import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { login, userInfoSelector } from "../reducers/users/userInfoSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    errorMessage,
    value: userInfo,
  } = useSelector(userInfoSelector);

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
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div
      style={{ maxWidth: 700 }}
      className=" mt-5 mx-auto py-4 px-5 border rounded shadow-sm"
    >
      <h2 className="mb-4">Login</h2>
      {error && <Error msg={errorMessage} />}
      <Form noValidate validated={validated} onSubmit={handlerSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div>
          <Link to="/register">
            <small>Register ?</small>
          </Link>
        </div>

        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

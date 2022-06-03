import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import { updateUser, userSelector } from "../reducers/users/userSllice";

const initState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function EditUsrePage() {
  const {
    loading,
    error,
    errorMessage,
    value: users,
  } = useSelector(userSelector);
  const [validated, setValidated] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const [user, setUser] = useState(initState);
  const [checkRole, setCheckRole] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
        user.role = checkRole ? "admin" : "user";
        dispatch(updateUser(id, user, navigate));
      } else {
        setNotMatch(true);
      }
    }
  };

  useEffect(() => {
    if (users.length !== 0) {
      const { firstname, lastname, email, role } = users.filter(
        (user) => user.id === Number(id)
      )[0];
      setUser({ ...initState, firstname, lastname, email });
      setCheckRole(role === "admin" ? true : false);
    }
  }, [users, id]);

  return (
    <div
      style={{ maxWidth: 700 }}
      className=" mt-5 mx-auto py-4 px-5 border rounded shadow-sm"
    >
      <h2 className="mb-4">Update User</h2>
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
                value={user.firstname || ""}
                onChange={handlerChange}
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
                value={user.lastname || ""}
                onChange={handlerChange}
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
            value={user.email || ""}
            onChange={handlerChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="password"
            value={user.password || ""}
            onChange={handlerChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            name="confirmPassword"
            value={user.confirmPassword || ""}
            onChange={handlerChange}
          />
          {notMatch && (
            <small style={{ color: "#f00" }}>not match password</small>
          )}
        </Form.Group>

        <Form.Check
          type="switch"
          id="custom-switch"
          label="Amin"
          name="role"
          checked={checkRole}
          onChange={(e) => setCheckRole(e.target.checked)}
        />

        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

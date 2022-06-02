import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { getUsers, userSelector } from "../reducers/users/userSllice";

export default function UsersPage() {
  const {
    loading,
    error,
    errorMessage,
    value: users,
  } = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <>
      <h2 className="my-3">All Users</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={errorMessage} />
      ) : users ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname + " " + user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button>Edit</Button>
                </td>
                <td>
                  <Button variant="secondary">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  getUsers,
  removeUser,
  userSelector,
} from "../reducers/users/userSllice";
import { Link, useNavigate } from "react-router-dom";

export default function UsersPage() {
  const {
    loading,
    error,
    errorMessage,
    value: users,
  } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteHandler = (id) => {
    if (window.confirm(`yout want to remove user id: ${id}`)) {
      dispatch(removeUser(id));
    }
  };

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
                  <Link to={`/dashboard/admin/users/products/${user.id}`}>
                    UserProducts
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/admin/users/edit/${user.id}`)
                    }
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => deleteHandler(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
}

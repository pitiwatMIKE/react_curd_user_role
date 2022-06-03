import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Paginate from "../components/Paginate";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  deleteUserProducts,
  getUserProducts,
  userProductsSelector,
} from "../reducers/products/userProductsSlice";
import GoBack from "../components/GoBack";

function UserProductsPage() {
  const {
    loading,
    error,
    errorMessage,
    value: { userProducts, maxPage },
  } = useSelector(userProductsSelector);
  let { page, userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerDelete = (id) => {
    if (window.confirm(`yout want to remove product id: ${id}`)) {
      dispatch(deleteUserProducts(id));
    }
  };

  useEffect(() => {
    dispatch(getUserProducts({ userId, page }));
  }, [dispatch, userId, page]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={errorMessage} />
      ) : userProducts ? (
        <>
          <GoBack path="/dashboard/admin/users" />
          <Row className="mt-3 mb-3 justify-content-between">
            <Col md={12} lg="auto">
              <h2>MyProductsPage</h2>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>qty</th>
              </tr>
            </thead>
            <tbody>
              {userProducts.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Image src={item.image} width={100} fluid />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
                  <td>
                    <Link to={`/product/${item.id}`}>Detail</Link>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        navigate(
                          `/dashboard/admin/users/products/edit/${item.id}`
                        )
                      }
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handlerDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate count={2} page={page} maxPage={maxPage} />
        </>
      ) : null}
    </>
  );
}

export default UserProductsPage;

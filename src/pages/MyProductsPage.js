import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import {
  deleteMyProduct,
  getMyProducts,
  myProductsSelector,
} from "../reducers/products/myProdutsSlice";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Paginate from "../components/Paginate";
import { Link, useParams, useNavigate } from "react-router-dom";

function MyProductsPage() {
  let { page } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error,
    errorMessage,
    value: { myProducts, maxPage },
  } = useSelector(myProductsSelector);

  const handlerDelete = (id) => {
    if (window.confirm(`yout want to remove product id: ${id}`)) {
      dispatch(deleteMyProduct(id));
    }
  };

  useEffect(() => {
    dispatch(getMyProducts({ page }));
  }, [dispatch, page]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={errorMessage} />
      ) : myProducts ? (
        <>
          <Row className="mt-5 mb-3 justify-content-between">
            <Col md={12} lg="auto">
              <h2>MyProductsPage</h2>
            </Col>
            <Col lg="auto">
              <Button onClick={() => navigate("/dashboard/myproducts/create")}>
                Create Product
              </Button>
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
              {myProducts.map((item) => (
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
                    <Button>Edit</Button>
                  </td>
                  <td>
                    <Button variant="secondary" onClick={() => handlerDelete(item.id)}>
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

export default MyProductsPage;

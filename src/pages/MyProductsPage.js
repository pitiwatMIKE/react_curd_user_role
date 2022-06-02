import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Table } from "react-bootstrap";
import {
  deleteMyProduct,
  getMyProducts,
  myProductsSelector,
} from "../reducers/products/myProductsSelic";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";

function MyProductsPage() {
  let { page } = useParams();
  const dispatch = useDispatch();
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
          <h2 className="mt-5 mb-3">MyProductsPage</h2>
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
                    <Button>Edit</Button>
                  </td>
                  <td>
                    <Button onClick={() => handlerDelete(item.id)}>
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Table } from "react-bootstrap";
import {
  getMyProducts,
  myProductsSelector,
} from "../reducers/products/myProductsSelic";
import Loading from "../components/Loading";
import Error from "../components/Error";

function MyProductsPage() {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    errorMessage,
    value: myProducts,
  } = useSelector(myProductsSelector);

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

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
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
    </>
  );
}

export default MyProductsPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import {
  getAllProducts,
  allProductsSelector,
} from "../reducers/products/allProductsSlice";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    value: allProducts,
  } = useSelector(allProductsSelector);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <h1>All Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={allProducts} />
      ) : allProducts ? (
        <div>
          <Row className="justify-content-around mt-3">
            {allProducts.map((item) => (
              <Col className="mb-5" md="auto" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : null}
    </>
  );
}

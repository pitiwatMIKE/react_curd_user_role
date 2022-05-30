import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import {
  getAllProducts,
  allProductsSelector,
} from "../reducers/products/allProductsSlice";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Search from "../components/Search";
import Paginate from "../components/Paginate";

export default function HomePage() {
  const dispatch = useDispatch();
  const { loading, error, value } = useSelector(allProductsSelector);
  const { page, search } = useParams();

  useEffect(() => {
    dispatch(getAllProducts({ page, search }));
  }, [dispatch, page, search]);

  return (
    <>
      <h1>All Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={value} />
      ) : value.products ? (
        <div>
          <Search serchUrl={search} />

          {/* alert search */}
          {value.products.length === 0 ? (
            <h1>Not Found Product: {search}</h1>
          ) : (
            search && <h2>Search: {search}</h2>
          )}

          {/* Products List */}
          <Row className="justify-content-around mt-3">
            {value.products.map((item) => (
              <Col className="mb-5" md="auto" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Paginate count={2} page={page} search={search} maxPage={value.maxPage} />
        </div>
      ) : null}
    </>
  );
}

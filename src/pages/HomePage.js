import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const products = [...Array(20)];
  return (
    <>
      <h1>All Products</h1>
      <div>
        <Row className="justify-content-around mt-3">
          {products.map((item, index) => (
            <Col className="mb-5" md="auto" key={index}>
              <ProductCard
                id={index}
                img="https://via.placeholder.com/600x400"
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

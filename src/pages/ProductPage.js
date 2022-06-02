import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DateFormat from "../components/DateFormat";
import GoBack from "../components/GoBack";

function ProductPage() {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async function () {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    })();
  }, [id]);

  return (
    <div>
      <GoBack />
      {product ? (
        <>
          <h2>Product id: {id}</h2>
          <Row className="mt-4">
            <Col sm={12} md={12} lg={6}>
              <div>
                <Image src={product.image} fluid />
              </div>
            </Col>

            <Col>
              <p>
                <strong>
                  {" "}
                  UpdateAt : <DateFormat time={product.updatedAt} />
                </strong>
              </p>
              <div>
                <strong>Price: {product.price}</strong>
              </div>
              <p>
                <strong>Qty: {product.qty}</strong>
              </p>
              <p>{product.desc}</p>
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
}

export default ProductPage;

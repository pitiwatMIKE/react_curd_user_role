import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Truncate from "./Truncate";

const ProductCard = React.memo(({ item }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: "16rem", margin: "auto", cursor: "pointer" }}
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <Truncate>{item.desc}</Truncate>
        </Card.Text>
        <Row md="auto" className="justify-content-between">
          <Col>
            <strong>Qty: {item.qty}</strong>
          </Col>
          <Col>
            <strong>price: {item.price}</strong>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
});

export default ProductCard;

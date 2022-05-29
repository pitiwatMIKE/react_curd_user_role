import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Truncate from "./Truncate";

export default function ProductCard({ img, id }) {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: "16rem", margin: "auto", cursor: "pointer" }}
      onClick={() => navigate(`/product/${id}`)}
    >
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          <Truncate>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Truncate>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

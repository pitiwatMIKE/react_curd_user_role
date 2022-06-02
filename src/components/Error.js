import React from "react";
import { Alert } from "react-bootstrap";

export default function Error({ msg }) {
  return (
    <div className="my-3">
      <Alert variant={"danger"}>Error {msg}</Alert>
    </div>
  );
}

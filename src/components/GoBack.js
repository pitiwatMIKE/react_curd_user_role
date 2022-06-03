import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function GoBack({ path }) {
  const navigate = useNavigate();
  return (
    <Button
      className="mb-3 mt-3"
      onClick={() => (path ? navigate(path) : navigate(-1))}
    >
      {"<< Go Back"}
    </Button>
  );
}

export default GoBack;

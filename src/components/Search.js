import React, { useState } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = ({ serchUrl }) => {
  const [search, setSearch] = useState(serchUrl || "");
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search/${search}/page/1`);
    } else {
      navigate("/page/1");
    }
  };

  return (
    <Form onSubmit={(e) => handlerSubmit(e)}>
      <InputGroup className="mb-3" style={{ maxWidth: 500 }}>
        <FormControl
          placeholder="Search products"
          aria-label="Search proudcts"
          aria-describedby="basic-addon2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Button
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;

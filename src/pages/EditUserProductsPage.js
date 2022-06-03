import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import GoBack from "../components/GoBack";
import {
  updateUserProducts,
  userProductsSelector,
} from "../reducers/products/userProductsSlice";

const initState = {
  name: "",
  qty: 0,
  price: 0,
  desc: "",
  image: "",
};

export default function EditUserProductsPage() {
  const {
    loading,
    error,
    errorMessage,
    value: { userProducts },
  } = useSelector(userProductsSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState(initState);
  const [imageProduct, setImageProduct] = useState("");

  const handlerChange = (e) => {
    let { name, value } = e.target;
    return (() => {
      setProduct({ ...product, [name]: value });
    })();
  };

  const handlerUploadImage = (e) => {
    let file = e.target.files[0];
    let allowExt = ["png", "jpg", "jpeg"];

    if (allowExt.includes(file.name.split(".").pop())) {
      setProduct({ ...product, image: "" });
      setImageProduct(file);
    } else {
      e.target.value = null;
      setImageProduct("");
    }
  };

  const checkForm = (event) => {
    const form = event.currentTarget;
    let status = true;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      status = false;
    }
    setValidated(true);
    return status;
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (checkForm(e)) {
      product.image_product = imageProduct;
      dispatch(updateUserProducts(id, product, navigate));
    }
  };

  useEffect(() => {
    if (userProducts) {
      let { name, qty, price, desc, image } = userProducts.filter(
        (item) => item.id === Number(id)
      )[0];
      setProduct({ name, qty, price, desc, image });
    }
  }, [userProducts, id]);

  return (
    <>
      <GoBack />
      <div
        style={{ maxWidth: 700 }}
        className=" mx-auto py-4 px-5 border rounded shadow-sm"
      >
        <h2 className="my-3">Update My Product id {id}</h2>
        {error && <Error msg={errorMessage} />}
        <Form noValidate validated={validated} onSubmit={handlerSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="name"
              value={product.name}
              onChange={handlerChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={12} lg={6}>
              <Form.Group className="mb-3" controlId="formQty">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Qty"
                  name="qty"
                  value={product.qty}
                  onChange={handlerChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  name="price"
                  value={product.price}
                  onChange={handlerChange}
                  required
                />
              </Form.Group>
            </Col>

            <Form.Group className="mb-3" controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Description"
                name="desc"
                value={product.price}
                onChange={handlerChange}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handlerUploadImage}
              required={product.image ? false : true}
            />
          </Form.Group>

          {/* Preview Image */}
          <div>
            {product.image && (
              <img alt="not fount" width={250} src={product.image} />
            )}
            {imageProduct && (
              <img
                alt="not fount"
                width={250}
                src={URL.createObjectURL(imageProduct)}
              />
            )}
          </div>

          <Button
            className="mt-3"
            variant="primary"
            type="submit"
            disabled={loading}
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

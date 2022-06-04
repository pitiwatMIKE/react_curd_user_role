import React, { useEffect, useState } from "react";
import { Button, Tooltip, OverlayTrigger, Spinner } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import axios from "axios";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Will do db:seed again to reset
  </Tooltip>
);

export default function AboutPage() {
  const fileName = "about.md";
  const [post, setPost] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handlerResetTable = async () => {
    setResetLoading(true);
    try {
      const response = await axios.get("/reset/db/table");
      console.log(response.data);
      setResetLoading(false);
    } catch (e) {
      console.log(e);
      setResetLoading(false);
    }
  };

  useEffect(() => {
    import(`../markdown/${fileName}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <div className="d-flex justify-content-end align-items-center mt-3">
        {resetLoading && (
          <Spinner className="me-3" animation="border" variant="danger" />
        )}
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button variant="danger" onClick={handlerResetTable}>
            ResetTable
          </Button>
        </OverlayTrigger>
      </div>
      <Markdown className="mt-3">{post}</Markdown>
    </>
  );
}

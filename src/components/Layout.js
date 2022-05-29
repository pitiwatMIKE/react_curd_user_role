import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container className="mt-2">{children}</Container>;
    </>
  );
}

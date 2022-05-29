import React from "react";

const truncate = (input, max) =>
  input.length > max ? input.substring(0, max) + "..." : input;

export default function Truncate({ children }) {
  return (
    <>{typeof children === "string" ? truncate(children, 50) : children}</>
  );
}

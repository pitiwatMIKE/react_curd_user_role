import React from "react";

export default function Error({ msg }) {
  return (
    <div className="my-3">
      <h6>Error {msg}</h6>
    </div>
  );
}

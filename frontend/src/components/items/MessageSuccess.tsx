import React from "react";

export default function MessageSuccess() {
  return (
    <div
      style={{ inlineSize: "100px", blockSize: "100px" }}
      className="rounded-circle border border-3 border-success d-flex align-items-center justify-content-center"
    >
      <h1 className="text-success">OK</h1>
    </div>
  );
}

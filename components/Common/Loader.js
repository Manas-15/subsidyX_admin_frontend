import React from "react";
import { Spin } from "antd";
import "antd/dist/reset.css";

export const DotLoading = ({
  name,
  type,
  bgColor,
  color,
  width,
  height,
  onClick,
  border,
}) => {
  return (
    <>
      <button
        type={type}
        style={{
          color: color,
          backgroundColor: bgColor,
          width: width,
          height: height,
          border: border,
        }}
        onClick={onClick}
        className={`btn mx-2`}
        disabled
      >
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span className="sr-only">{name}</span>
      </button>
    </>
  );
};

export const Spinner = () => (
  <div
    className="example"
    style={{
      position: "absolute",
      left: "700px",
      top: "350px",
      zIndex: "3333",
    }}
  >
    <Spin tip="Loading..." size="large" />
    {/* <div className="ant-spin-text text-primary">Loading...</div> */}
  </div>
);

import React, { useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import { TfiExport } from "react-icons/tfi";
import { BiFilter } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";
import { Form, InputGroup } from "react-bootstrap";
import { BsFillCaretDownFill } from "react-icons/bs";

export const CustomButton = ({
  name,
  type,
  bgColor,
  color,
  width,
  height,
  onClick,
  border,
  display,
  disabled,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        style={{
          color: color,
          backgroundColor: bgColor,
          width: width,
          height: height,
          border: border,
          display: display,
        }}
        onClick={onClick}
        className={`btn mx-2`}
      >
        {name}
      </button>
    </>
  );
};

export const ExportButton = ({ name }) => {
  return (
    <>
      <div className={`mx-2 ${styles.export_btn}`}>
        <button type="button" className="btn btn-light">
          <TfiExport /> {name}
        </button>
      </div>
    </>
  );
};
export const FilterButton = ({ name }) => {
  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.filter_bar}`}
      >
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <BiFilter className="fs-4 me-1" /> {name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <input type="checkbox" className="me-2" />
              Sector 1
            </Dropdown.Item>
            <Dropdown.Item href="#/action-1">
              <input type="checkbox" className="me-2" />
              Sector 2
            </Dropdown.Item>
            <Dropdown.Item href="#/action-1">
              <input type="checkbox" className="me-2" />
              Sector 3
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export const PaginationDropdown = ({ pageSize, setPageSize, pageSizeOptions }) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.custom_toggle}>
          {pageSize}{"  "}
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.custom_menu}>
          {pageSizeOptions?.map(p => (
            <Dropdown.Item key={p} onClick={() => { setPageSize(p) }}>
              {p}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

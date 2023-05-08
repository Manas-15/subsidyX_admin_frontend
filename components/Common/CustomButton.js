import React from "react";
import styles from "../../styles/Home.module.css";
import { TfiExport } from "react-icons/tfi";
import { BiFilter } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";

export const CustomButton = ({ name, bgColor, color, width, height, onClick }) => {
  return (
    <>
      <button
        type="button"
        style={{
          color: color,
          backgroundColor: bgColor,
          width: width,
          height: height,
        }}
        onClick={onClick}
        className={`btn ${styles.add_btn_name}`}
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
        <button type="button" class="btn btn-light">
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
        {/* <button type="button" class="btn btn-light">
          
        </button> */}

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

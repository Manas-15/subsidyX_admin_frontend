import React from "react";
import styles from "../../styles/Header.module.css";
import { IoIosArrowForward } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.header}`}
      >
        <div className={styles.header_name_a}>Industry Category</div>
        <div className={styles.header_name_b}>
          Subsidy <IoIosArrowForward /> Industry Category
        </div>
      </div>
    </>
  );
};

export default Header;

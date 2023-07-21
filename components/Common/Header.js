import React from "react";
import styles from "../../styles/Header.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = () => {
  const selectedCategory = useSelector((state) => state.sidebar);

  return (
    <>
      <div
        style={{ zIndex: "20", position: 'sticky' ,boxShadow:"1px 3px 3px rgba(0,0,0,0.2)" }}
        className={`d-flex justify-content-between align-items-center ${styles.header}`}
      >
        <div className={styles.header_name_a}>
          {selectedCategory.selectedItem}
        </div>
        <div className={styles.header_name_b}>
          subsidyX <IoIosArrowForward />
          <span style={{ color: "#FA6130" }}>{selectedCategory.selectedItem}</span>
        </div>
      </div>
    </>
  );
};

export default Header;

import React from "react";
import styles from "../../styles/Header.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = () => {
  const selectedCategory = useSelector((state) => state.sidebar);

  return (
    <>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.header}`}
      >
        <div className={styles.header_name_a}>
          {selectedCategory.selectedItem}
        </div>
        <div className={styles.header_name_b}>
          Subsidy <IoIosArrowForward /> {selectedCategory.selectedItem}
        </div>
      </div>
    </>
  );
};

export default Header;

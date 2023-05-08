import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Menu } from "antd";
import { CiSearch } from "react-icons/ci";
import { BiFilter } from "react-icons/bi";
import { TfiExport } from "react-icons/tfi";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "../components/Common/CustomButton";
import { HiEye } from "react-icons/hi";
import { BsShareFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

function Dashboard() {
  const tableListingData = [
    {
      enquireID: "#1",
      companyName: "Mark",
      companyOwnerName: "Otto",
      createdDt: "@mdo",
      category: "Texttile",
      actions: [
        { icon: BsShareFill },
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
      ],
    },
    {
      enquireID: "#1",
      companyName: "Mark",
      companyOwnerName: "Otto",
      createdDt: "@mdo",
      category: "Texttile",
      actions: [
        { icon: BsShareFill },
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
      ],
    },
    {
      enquireID: "#1",
      companyName: "Mark",
      companyOwnerName: "Otto",
      createdDt: "@mdo",
      category: "Texttile",
      actions: [
        { icon: BsShareFill },
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
      ],
    },
    {
      enquireID: "#1",
      companyName: "Mark",
      companyOwnerName: "Otto",
      createdDt: "@mdo",
      category: "Texttile",
      actions: [
        { icon: BsShareFill },
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
      ],
    },
    {
      enquireID: "#1",
      companyName: "Mark",
      companyOwnerName: "Otto",
      createdDt: "@mdo",
      category: "Texttile",
      actions: [
        { icon: BsShareFill },
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
      ],
    },
    {
      enquireID: "#1",
      companyName: "Mark",
      companyOwnerName: "Otto",
      createdDt: "@mdo",
      category: "Texttile",
      actions: [
        { icon: BsShareFill },
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
      ],
    },
    {
      enquireID: "#1",
      companyName: "Mark",
      companyOwnerName: "Otto",
      createdDt: "@mdo",
      category: "Texttile",
      actions: [
        { icon: BsShareFill },
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
      ],
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.tablee}>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
        >
          <div className="d-flex justify-content-evenly ">
            <div className={`mx-2 ${styles.search_box}`}>
              <div className={styles.search_icon}>
                <CiSearch />
              </div>
              <input
                type="text"
                className={styles.search_bar}
                placeholder="Search Industry Category"
              />
            </div>

            <FilterButton name="Filter" />
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New Industry Category"
                bgColor="#4682E3"
                color="#FFFFFF"
              />
            </div>

            <ExportButton name="Export List" />
          </div>
        </div>
        <div className={styles.tableBody}>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Enquiry ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Owner Name</th>
                <th scope="col">Created Date</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableListingData?.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{data?.enquireID}</th>
                    <td>{data?.companyName}</td>
                    <td>{data?.companyOwnerName}</td>
                    <td>{data?.createdDt}</td>
                    <td>{data?.category}</td>
                    <td>
                      <ul className="d-flex justify-content-between">
                        {data?.actions.map(({ icon: Icon, index }) => {
                          return (
                            <li>
                              <Icon color="#FA6130" size="18px" />
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

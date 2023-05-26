import React from "react";
import { Form, Row } from "react-bootstrap";
import { CustomButton } from "../components/Common/CustomButton";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editAdminstativeLable,
  getAdminstativeLable,
} from "../redux/Actions/adminstativeAction";

const AdminstrativeManagement = () => {
  const dispatch = useDispatch();
  const [adminstative, setAdminstative] = useState();

  const adminstativeLabel = useSelector((state) => state.adminstativeLabel);
  useEffect(() => {
    setAdminstative(adminstativeLabel?.adminstativeLabelData);
  }, [adminstativeLabel]);

  useEffect(() => {
    dispatch(getAdminstativeLable());
  }, [adminstativeLabel?.isUpdated]);

  const handleAdminstativeChange = (e) => {
    setAdminstative({ ...adminstative, [e.target.name]: e.target.value });
  };
  const adminstativeUpdate = (e) => {
    e.preventDefault();
    dispatch(editAdminstativeLable(adminstative));
    // console.log(adminstative);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tablee}>
          <div className={styles.tableBody}>
            <Form style={{ width: "550px", margin: "auto", marginTop: "50px" }}>
              <div className="d-flex">
                <h6 className="col-md-4">Country</h6>
                <Form.Group
                  className="mb-3 col-md-8"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Add new Country"
                    autoFocus
                    defaultValue={adminstative ? adminstative.country : ""}
                    onChange={(e) => handleAdminstativeChange(e)}
                  />
                </Form.Group>
              </div>
              <div className="d-flex">
                <h6 className="col-md-4">State</h6>
                <Form.Group
                  className="mb-3 col-md-8"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="Add new State"
                    autoFocus
                    defaultValue={adminstative ? adminstative.state : ""}
                    onChange={(e) => handleAdminstativeChange(e)}
                  />
                </Form.Group>
              </div>
              <div className="d-flex">
                <h6 className="col-md-4">District</h6>
                <Form.Group
                  className="mb-3 col-md-8"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    name="district"
                    placeholder="Add new District"
                    autoFocus
                    defaultValue={adminstative ? adminstative.district : ""}
                    onChange={(e) => handleAdminstativeChange(e)}
                  />
                </Form.Group>
              </div>
              <div className="d-flex">
                <h6 className="col-md-4">Taluka</h6>
                <Form.Group
                  className="mb-3 col-md-8"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    name="taluka"
                    placeholder="Add new Taluka"
                    autoFocus
                    defaultValue={adminstative ? adminstative.taluka : ""}
                    onChange={(e) => handleAdminstativeChange(e)}
                  />
                </Form.Group>
              </div>
              <div className="d-flex">
                <h6 className="col-md-4">Block</h6>
                <Form.Group
                  className="mb-3 col-md-8"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    name="block"
                    placeholder="Add new Block"
                    autoFocus
                    defaultValue={adminstative ? adminstative.block : ""}
                    onChange={(e) => handleAdminstativeChange(e)}
                  />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <CustomButton
                  name="Update"
                  color="#FFFFFF"
                  bgColor="#FA6130"
                  onClick={(e) => adminstativeUpdate(e)}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminstrativeManagement;

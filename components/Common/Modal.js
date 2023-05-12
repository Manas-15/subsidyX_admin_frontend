import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomButton } from "./CustomButton";
import Form from "react-bootstrap/Form";
// import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { BiFilter } from "react-icons/bi";
import {
  createIndustryCategory,
  deleteIndustryCategory,
  getIndustryLists,
} from "../../redux/Actions/industryCategoryAction";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createIndustrySector,
  deleteIndustrySector,
} from "../../redux/Actions/industrySectorAction";
import { useEffect } from "react";

export const IndustryCategoryModal = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const handleIndustryCategoryChange = (e) => {
    setState({ name: e.target.value });
  };
  const industryCategorySubmit = () => {
    dispatch(createIndustryCategory(state));
    props.setModalShow(false);
  };
  const industryCategoryDelete = () => {
    console.log(props.action);
    dispatch(deleteIndustryCategory(props.action));
    props.setModalShow(false);
  };
  const industryCategoryCancel = () => {
    props.setModalShow(false);
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type === "add"
            ? "Add New Category"
            : props.type === "delete"
            ? "Delete Category"
            : "Edit Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.type === "add" ? (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Add new Category"
                autoFocus
                onChange={(e) => handleIndustryCategoryChange(e)}
              />
            </Form.Group>
          </Form>
        ) : props.type === "delete" ? (
          "Do you want to delete this category, this can't be undone, category will removed from list."
        ) : (
          "Edit Category"
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.type === "add" ? (
          <CustomButton
            name="Submit"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => industryCategorySubmit()}
          />
        ) : props.type === "delete" ? (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => industryCategoryDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => industryCategoryCancel()}
            />
          </>
        ) : (
          <CustomButton
            name="Cancel"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => industryCategorySubmit()}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const IndustrySectorModal = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (key, event) => {
    setSelectedCategory({ key, value: event.target.value });
  };

  useEffect(() => {
    dispatch(getIndustryLists());
  }, []);

  const industryCategory = useSelector(
    (state) => state?.industryCategory?.industryCategoryData
  );

  const handleIndustrySectorChange = (e) => {
    setState(e.target.value);
  };
  const industrySectorSubmit = () => {
    const data = {
      name: state,
      industry_id: selectedCategory,
    };
    dispatch(createIndustrySector(data));
    props.setModalShow(false);
  };
  const industrySectorDelete = () => {
    console.log(props.action);
    dispatch(deleteIndustrySector(props.action));
    props.setModalShow(false);
  };
  const industryCategoryCancel = () => {
    props.setModalShow(false);
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type === "add"
            ? "Add New Sector"
            : props.type === "delete"
            ? "Delete Sector"
            : props.type === "edit" && "Edit Sector"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.type === "add" || props.type === "edit" ? (
          <Form>
            <Dropdown className="">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="w-100"
                onSelect={() => setSelectedCategory(category?.id)}
                title={selectedCategory || "Select Category"}
              >
                Select Category
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-100">
                {industryCategory?.map((category, index) => {
                  return (
                    <Dropdown.Item key={index}>{category?.name}</Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Add new Sector"
                autoFocus
                onChange={(e) => handleIndustrySectorChange(e)}
              />
            </Form.Group>
          </Form>
        ) : props.type === "delete" ? (
          "Do you want to delete this sector, this can't be undone, sector will removed from list."
        ) : (
          "Edit Sector"
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.type === "add" ? (
          <CustomButton
            name="Submit"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => industrySectorSubmit()}
          />
        ) : props.type === "delete" ? (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => industrySectorDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => industryCategoryCancel()}
            />
          </>
        ) : (
          <CustomButton
            name="Cancel"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => industryCategorySubmit()}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

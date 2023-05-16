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
  editIndustrySector,
} from "../../redux/Actions/industrySectorAction";
import { useEffect } from "react";
import {
  createStateManagement,
  deleteStateManagement,
} from "../../redux/Actions/stateManagementAction";

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
  console.log(props.action);
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    dispatch(getIndustryLists());
  }, []);

  const industryCategory = useSelector(
    (state) => state?.industryCategory?.industryCategoryData
  );

  const handleIndustrySectorChange = (e) => {
    console.log("HHHHHHHHHHHHHHHHHHHH", e.target.value);

    setState(e.target.value);
  };
  const editIndustrySectorChange = (e) => {
    console.log("EDITTTTTTTTTTTTTTTTTT", e.target.value);
    setState(e.target.value);
  };
  const industrySectorSubmit = () => {
    const data = {
      name: state,
      industry_id: selectedCategory,
    };
 

    props.action.id
      ? dispatch(editIndustrySector(data, selectedCategory))
      : dispatch(createIndustrySector(data));

    props.setmodalshow(false);
  };
  const industrySectorDelete = () => {
    dispatch(deleteIndustrySector(props.action));
    props.setmodalshow(false);
  };
  const industryCategoryCancel = () => {
    props.setmodalshow(false);
  };
  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
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
            <select onChange={handleSelectChange} className="form-control mb-3">
              <option value="none">
                {props.action?.industry
                  ? props.action?.industry
                  : "Select Category"}
              </option>
              {industryCategory?.map((category, index) => {
                return (
                  <option
                    className="form-control"
                    key={index}
                    value={category?.id}
                  >
                    {category?.name}
                  </option>
                );
              })}
            </select>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Add new Sector"
                autoFocus
                defaultValue={props.action.id ? props.action.name : ""}
                onChange={
                  props.action.id
                    ? (e) => editIndustrySectorChange(e)
                    : (e) => handleIndustrySectorChange(e)
                }
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
          <>
            <CustomButton
              name="Update"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => industrySectorSubmit()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => industryCategoryCancel()}
            />
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const StateManagementModal = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (key, event) => {
    setSelectedCategory({ key, value: event.target.value });
  };

  const handleStateManagementChange = (e) => {
    setState(e.target.value);
  };
  const stateManagementSubmit = () => {
    const data = {
      state_name: state,
    };
    dispatch(createStateManagement(data));
    props.setModalShow(false);
  };
  const stateManagementDelete = () => {
    dispatch(deleteStateManagement(props.action));
    props.setModalShow(false);
  };
  const stateManagementCancel = () => {
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
            ? "Add New State"
            : props.type === "delete"
            ? "Delete State"
            : props.type === "edit" && "Edit State"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.type === "add" || props.type === "edit" ? (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Add new state"
                autoFocus
                onChange={(e) => handleStateManagementChange(e)}
              />
            </Form.Group>
          </Form>
        ) : props.type === "delete" ? (
          "Do you want to delete this state, this can't be undone, state will removed from list."
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
            onClick={() => stateManagementSubmit()}
          />
        ) : props.type === "delete" ? (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => stateManagementDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => stateManagementCancel()}
            />
          </>
        ) : (
          <CustomButton
            name="Cancel"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => stateManagementSubmit()}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const DistrictManagementModal = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [selectedState, setSelectedState] = useState(null);

  const handleSelect = (key, event) => {
    setSelectedState({ key, value: event.target.value });
  };

  const handleStateManagementChange = (e) => {
    setState(e.target.value);
  };
  const stateManagementSubmit = () => {
    const data = {
      state_name: state,
    };
    dispatch(createStateManagement(data));
    props.setModalShow(false);
  };
  const stateManagementDelete = () => {
    dispatch(deleteStateManagement(props.action));
    props.setModalShow(false);
  };
  const stateManagementCancel = () => {
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
            ? "Add New District"
            : props.type === "delete"
            ? "Delete District"
            : props.type === "edit" && "Edit District"}
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
                onSelect={() => setSelectedState(category?.id)}
                title={selectedState || "Select Category"}
              >
                Select State
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
                placeholder="Add new district"
                autoFocus
                onChange={(e) => handleStateManagementChange(e)}
              />
            </Form.Group>
          </Form>
        ) : props.type === "delete" ? (
          "Do you want to delete this district, this can't be undone, district will removed from list."
        ) : (
          "Edit District"
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.type === "add" ? (
          <CustomButton
            name="Submit"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => stateManagementSubmit()}
          />
        ) : props.type === "delete" ? (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => stateManagementDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => stateManagementCancel()}
            />
          </>
        ) : (
          <CustomButton
            name="Cancel"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => stateManagementSubmit()}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

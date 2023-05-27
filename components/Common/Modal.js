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
  editIndustryCategory,
  getIndustryCategoryLists,
  getIndustryLists,
  industryCategoryActions,
} from "../../redux/Actions/industryCategoryAction";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createIndustrySector,
  deleteIndustrySector,
  editIndustrySector,
  getIndustrySectorLists,
  industrySectorActions,
} from "../../redux/Actions/industrySectorAction";
import { useEffect } from "react";
import {
  createStateManagement,
  deleteStateManagement,
  editStateManagement,
  getStateManagementLists,
  stateManagementAction,
} from "../../redux/Actions/stateManagementAction";
import {
  createDistrictManagement,
  deleteDistrictManagement,
  districtManagementAction,
  editDistrictManagement,
  getDistrictManagementLists,
} from "../../redux/Actions/districtManagementAction";
import {
  createTalukaManagement,
  deleteTalukaManagement,
  editTalukaManagement,
  talukaManagementAction,
} from "../../redux/Actions/talukaManagementAction";
import {
  deleteQuestionManagement,
  questionActions,
} from "../../redux/Actions/questionsAction";

export const IndustryCategoryModal = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const handleIndustryCategoryChange = (e) => {
    setState({ name: e.target.value });
  };
  const industryCategorySubmit = () => {
    if (props?.action?.id) {
      const id = props?.action?.id;
      dispatch(industryCategoryActions?.updateCategory({ id, state }));
    } else {
      dispatch(industryCategoryActions?.createCategory(state));
    }
    props.setModalShow(false);
  };
  const industryCategoryDelete = () => {
    dispatch(industryCategoryActions?.deleteCategory(props.action));
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
        {props.type === "add" || props.type === "edit" ? (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Add new Category"
                defaultValue={props.action.id ? props?.action?.name : ""}
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
          props.type === "edit" && (
            <>
              <CustomButton
                name="Update"
                color="#FFFFFF"
                bgColor="#FA6130"
                onClick={() => industryCategorySubmit()}
              />
              <CustomButton
                name="Cancel"
                color="#000000"
                bgColor="#FFFFFF"
                border="1px solid #000000"
                onClick={() => industryCategoryCancel()}
              />
            </>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const IndustrySectorModal = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    dispatch(industryCategoryActions?.getCategories());
  }, []);

  const industryCategory = useSelector(
    (state) => state?.industryCategory?.industryCategoryData
  );

  const handleIndustrySectorChange = (e) => {
    setState(e.target.value);
  };
  const editIndustrySectorChange = (e) => {
    setState(e.target.value);
  };
  const industrySectorSubmit = () => {
    const industrySectorData = {
      name: state,
      industry_id: selectedCategory,
    };

    if (props?.action?.id) {
      const id = props?.action?.id;
      dispatch(industrySectorActions?.updateSector({ id, industrySectorData }));
    } else {
      dispatch(industrySectorActions?.createSector(industrySectorData));
    }
    props.setmodalshow(false);
  };
  const industrySectorDelete = () => {
    dispatch(industrySectorActions?.deleteSector(props.action));
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
  // console.log(props);
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  const handleSelect = (key, event) => {
    setSelectedCategory({ key, value: event.target.value });
  };

  const handleStateManagementChange = (e) => {
    setState(e.target.value);
  };
  const editIndustrySectorChange = (e) => {
    setState(e.target.value);
  };
  const stateManagementSubmit = () => {
    const data = {
      state_name: state,
    };
    if (props?.action?.id) {
      const id = props?.action?.id;
      dispatch(
        stateManagementAction?.updateState({
          id: id,
          editData: data,
        })
      );
    } else {
      dispatch(stateManagementAction?.createState(data));
    }
    props.setModalShow(false);
  };
  const stateManagementDelete = () => {
    dispatch(stateManagementAction?.deleteState(props.action));
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
                placeholder={props.action.id ? "Edit State" : "Add new state"}
                autoFocus
                defaultValue={props?.action?.id ? props?.action?.name : ""}
                onChange={
                  props.action.id
                    ? (e) => editIndustrySectorChange(e)
                    : (e) => handleStateManagementChange(e)
                }
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
          props.type === "edit" && (
            <>
              <CustomButton
                name="Update"
                color="#FFFFFF"
                bgColor="#FA6130"
                onClick={() => stateManagementSubmit()}
              />
              <CustomButton
                name="Cancel"
                color="#000000"
                bgColor="#FFFFFF"
                border="1px solid #000000"
                onClick={() => stateManagementCancel()}
              />
            </>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const DistrictManagementModal = (props) => {
  const dispatch = useDispatch();
  const [districtName, setDistrictName] = useState("");
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    dispatch(stateManagementAction?.getStates());
  }, []);

  const allStates = useSelector((state) => state.state);

  const districtManagementSubmit = () => {
    const data = {
      name: districtName,
      state_id: selectedState,
    };

    if (props?.action?.id) {
      const id = props?.action?.id;
      dispatch(
        districtManagementAction?.updateDistrict({
          id: id,
          editData: data,
        })
      );
    } else {
      dispatch(districtManagementAction?.createDistrict(data));
    }
    props.setModalShow(false);
  };
  const districtManagementDelete = () => {
    dispatch(districtManagementAction?.deleteDistrict(props.action));
    props.setModalShow(false);
  };
  const districtManagementCancel = () => {
    props.setModalShow(false);
  };
  const handleSelectDistrictChange = (e) => {
    const stateID = e.target.value;
    setSelectedState(stateID);
  };
  const handleDistrictChange = (e) => {
    setDistrictName(e.target.value);
  };
  const editIndustrySectorChange = (e) => {
    setDistrictName(e.target.value);
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
            <select
              onChange={handleSelectDistrictChange}
              className="form-control mb-3"
            >
              <option value="none">
                {props.action?.id ? props.action?.state_name : "Select State"}
              </option>
              {allStates?.stateManagementData?.map((state, index) => {
                return (
                  <option
                    className="form-control"
                    key={index}
                    value={state?.id}
                  >
                    {state?.name}
                  </option>
                );
              })}
            </select>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Add new District"
                autoFocus
                defaultValue={props.action.id ? props.action.name : ""}
                onChange={
                  props.action.id
                    ? (e) => editIndustrySectorChange(e)
                    : (e) => handleDistrictChange(e)
                }
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
            onClick={() => districtManagementSubmit()}
          />
        ) : props.type === "delete" ? (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => districtManagementDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => districtManagementCancel()}
            />
          </>
        ) : (
          props.type === "edit" && (
            <>
              <CustomButton
                name="Submit"
                color="#FFFFFF"
                bgColor="#FA6130"
                onClick={() => districtManagementSubmit()}
              />
              <CustomButton
                name="Cancel"
                color="#000000"
                bgColor="#FFFFFF"
                border="1px solid #000000"
                onClick={() => districtManagementCancel()}
              />
            </>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const TalukaManagementModal = (props) => {
  const dispatch = useDispatch();
  const [talukaName, setTalukaName] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    dispatch(stateManagementAction?.getStates());
    if (selectedState !== null) {
      dispatch(districtManagementAction?.getDistricts(selectedState));
    }
  }, [selectedState]);

  const allStates = useSelector((state) => state.state);
  const allDistricts = useSelector((state) => state.district);

  const talukaManagementSubmit = () => {
    const data = {
      name: talukaName,
      district_id: selectedDistrict,
      state_id: selectedState,
    };

    if (props?.action?.id) {
      const id = props?.action?.id;
      dispatch(
        talukaManagementAction?.updateTaluka({
          id: id,
          editData: data,
        })
      );
    } else {
      dispatch(talukaManagementAction?.createTaluka(data));
    }
    props.toggleModalshow(false);
  };
  const talukaManagementDelete = () => {
    dispatch(talukaManagementAction?.deleteTaluka(props.action));
    props.toggleModalshow(false);
  };
  const talukaManagementCancel = () => {
    props.toggleModalshow(false);
  };
  const handleSelectStateChange = (e) => {
    const stateID = e.target.value;
    setSelectedState(stateID);
  };
  const handleSelectDistrictChange = (e) => {
    const districtID = e.target.value;
    setSelectedDistrict(districtID);
  };
  const handleTalukaChange = (e) => {
    setTalukaName(e.target.value);
  };
  const editTalukaChange = (e) => {
    setTalukaName(e.target.value);
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
            ? "Add New Taluka"
            : props.type === "delete"
            ? "Delete Taluka"
            : props.type === "edit" && "Edit Taluka"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.type === "add" || props.type === "edit" ? (
          <Form>
            <select
              onChange={handleSelectStateChange}
              className="form-control mb-3"
            >
              <option value="none">
                {props.action?.id ? props.action?.state : "Select State"}
              </option>
              {allStates?.stateManagementData?.map((state, index) => {
                return (
                  <option
                    className="form-control"
                    key={index}
                    value={state?.id}
                  >
                    {state?.name}
                  </option>
                );
              })}
            </select>
            <select
              onChange={handleSelectDistrictChange}
              className="form-control mb-3"
            >
              <option value="none">
                {props.action?.id ? props.action?.district : "Select District"}
              </option>
              {allDistricts?.districtManagementData?.district?.map(
                (district, index) => {
                  return (
                    <option
                      className="form-control"
                      key={index}
                      value={district?.id}
                    >
                      {district?.district}
                    </option>
                  );
                }
              )}
            </select>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Add new Taluka"
                autoFocus
                defaultValue={props.action.id ? props.action.name : ""}
                onChange={
                  props.action.id
                    ? (e) => editTalukaChange(e)
                    : (e) => handleTalukaChange(e)
                }
              />
            </Form.Group>
          </Form>
        ) : props.type === "delete" ? (
          "Do you want to delete this taluka, this can't be undone, taluka will removed from list."
        ) : (
          "Edit Taluka"
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.type === "add" ? (
          <CustomButton
            name="Submit"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => talukaManagementSubmit()}
          />
        ) : props.type === "delete" ? (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => talukaManagementDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => talukaManagementCancel()}
            />
          </>
        ) : (
          props.type === "edit" && (
            <>
              <CustomButton
                name="Update"
                color="#FFFFFF"
                bgColor="#FA6130"
                onClick={() => talukaManagementSubmit()}
              />
              <CustomButton
                name="Cancel"
                color="#000000"
                bgColor="#FFFFFF"
                border="1px solid #000000"
                onClick={() => talukaManagementCancel()}
              />
            </>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const QuestionManagementModal = (props) => {
  const dispatch = useDispatch();

  const questionManagementDelete = () => {
    dispatch(questionActions?.deleteQuestion(props.action));
    // props.toggleModalshow(false);
  };
  const questionManagementCancel = () => {
    // props.toggleModalshow(false);
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
          Delete Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.type === "delete" &&
          "Do you want to delete this question, this can't be undone, question will removed from list."}
      </Modal.Body>
      <Modal.Footer>
        {props.type === "delete" && (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => questionManagementDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => questionManagementCancel()}
            />
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

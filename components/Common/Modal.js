import Modal from "react-bootstrap/Modal";
import { CustomButton } from "./CustomButton";
import Form from "react-bootstrap/Form";
import { industryCategoryActions } from "../../redux/Actions/industryCategoryAction";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { industrySectorActions } from "../../redux/Actions/industrySectorAction";
import { useEffect } from "react";
import { stateManagementAction } from "../../redux/Actions/stateManagementAction";
import { districtManagementAction } from "../../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../../redux/Actions/talukaManagementAction";
import { questionActions } from "../../redux/Actions/questionsAction";
import { subsidyManagementAction } from "../../redux/Actions/subsidyManagementAction";
import { RxCross2 } from "react-icons/rx";
import { clientData } from "../../static/clientData";
import { clientManagementAction } from "../../redux/Actions/clientManagementAction";
import { trustedPartnerManagementActions } from "../../redux/Actions/trustedPartnersAction";
import { useRouter } from "next/router";
import { channelPartnerManagementActions } from "../../redux/Actions/channelPartnersAction";
import { membershipManagementActions } from "../../redux/Actions/membershipActions";
import { employeeManagementAction } from "../../redux/Actions/employeeActions";
import { departmentData } from "../../static/departmentData";

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
    props.setType("");
    props.setAction({});
  };

  const industryCategoryDelete = () => {
    dispatch(industryCategoryActions?.deleteCategory(props.action));
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const industryCategoryCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      {/* closeButton */}
      <Modal.Header>
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
          <>
            <CustomButton
              name="Submit"
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
    if (props.type === "add") {
      dispatch(industryCategoryActions?.getCategories());
    }
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
  console.log(selectedCategory);

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
    props.setType("");
    props.setAction({});
  };
  const industrySectorDelete = () => {
    dispatch(industrySectorActions?.deleteSector(props.action));
    props.setmodalshow(false);
    props.setType("");
    props.setAction({});
  };
  const industrySectorCancel = () => {
    props.setmodalshow(false);
    props.setType("");
    props.setAction({});
  };
  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  // industry_id;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
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
          <>
            <CustomButton
              name="Submit"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => industrySectorSubmit()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => industrySectorCancel()}
            />
          </>
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
              onClick={() => industrySectorCancel()}
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
              onClick={() => industrySectorCancel()}
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
    props.setType("");
    props.setAction({});
  };
  const stateManagementDelete = () => {
    dispatch(stateManagementAction?.deleteState(props.action));
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const stateManagementCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
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
          <>
            <CustomButton
              name="Submit"
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
    props.setType("");
    props.setAction({});
  };
  const districtManagementDelete = () => {
    dispatch(districtManagementAction?.deleteDistrict(props.action));
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const districtManagementCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
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
      <Modal.Header>
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

const categories = [
  { name: "Category 1", id: 1 },
  { name: "Category 2", id: 2 },
  { name: "Category 3", id: 3 },
];

export const TalukaManagementModal = (props) => {
  console.log(props.action);
  const dispatch = useDispatch();
  const [talukaName, setTalukaName] = useState(
    props.action?.name ? props.action?.name : ""
  );
  const [selectedState, setSelectedState] = useState(
    props.action?.state_id ? props.action?.state_id : null
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    props.action?.district_id ? props.action?.district_id : null
  );
  const [selectedCategoryID, setSelectedCategoryID] = useState(
    props.action?.category_id ? props.action?.category_id : 1
  );

  useEffect(() => {
    dispatch(stateManagementAction?.getStates());
  }, [selectedState]);

  const allStates = useSelector((state) => state.state);
  const allDistricts = useSelector((state) => state.district);

  const talukaManagementSubmit = () => {
    const data = {
      name: talukaName,
      district_id: parseInt(selectedDistrict),
      state_id: parseInt(selectedState),
      category_id: parseInt(selectedCategoryID),
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
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const talukaManagementDelete = () => {
    dispatch(talukaManagementAction?.deleteTaluka(props.action));
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const talukaManagementCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const handleSelectStateChange = (e) => {
    const stateID = e.target.value;
    dispatch(districtManagementAction?.getDistricts(stateID));
    setSelectedState(stateID);
  };
  const handleSelectDistrictChange = (e) => {
    const districtID = e.target.value;
    setSelectedDistrict(districtID);
  };
  const handleTalukaChange = (e) => {
    setTalukaName(e.target.value);
  };

  const handleSelectCategoryIDChange = (e) => {
    const categoryID = e.target.value;
    setSelectedCategoryID(categoryID);
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
      <Modal.Header>
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
                      {district?.name}
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
            <select
              onChange={handleSelectCategoryIDChange}
              className="form-control mb-3"
            >
              <option value="none">
                {props.action?.id
                  ? props.action?.category_id === 1
                    ? "Category 1"
                    : props.action?.category_id === 2
                      ? "Category 2"
                      : "Category 3"
                  : "Select Category"}
              </option>
              {categories?.map((cat, index) => {
                return (
                  <option className="form-control" key={index} value={cat?.id}>
                    {cat?.name}
                  </option>
                );
              })}
            </select>
          </Form>
        ) : props.type === "delete" ? (
          "Do you want to delete this taluka, this can't be undone, taluka will removed from list."
        ) : (
          "Edit Taluka"
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.type === "add" ? (
          <>
            <CustomButton
              name="Submit"
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
export const DepartmentManagementModal = (props) => {
  console.log(props.action);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState(
    props.action?.departmentName ? props.action?.departmentName : ""
  );

  const departmentSubmit = () => {
    const data = {
      name: department,
    };

    if (props?.action?.id) {
      // const id = props?.action?.id;
      // dispatch(
      //   talukaManagementAction?.updateTaluka({
      //     id: id,
      //     editData: data,
      //   })
      // );
    } else {
      // dispatch(talukaManagementAction?.createTaluka(data));
    }
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const departmentManagementDelete = () => {
    // dispatch(talukaManagementAction?.deleteTaluka(props.action));
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const departmentManagementCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setDepartment(department);
  };


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type === "add"
            ? "Add New Department"
            : props.type === "delete"
              ? "Delete Department"
              : props.type === "edit" && "Edit Department"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.type === "add" || props.type === "edit" ? (
          <Form>
            <select
              onChange={handleDepartmentChange}
              className="form-control mb-3"
            >
              <option value="none">
                {props.action?.id ? props.action?.departmentName : "Select department"}
              </option>
              {departmentData.map((x, index) => {
                return (
                  <option
                    className="form-control"
                    key={index}
                    value={x?.departmentName}
                  >
                    {x?.departmentName}
                  </option>
                );
              })}
            </select>



          </Form>
        ) : props.type === "delete" ? (
          "Do you want to delete this department, this can't be undone, department will removed from list."
        ) : (
          "Edit Taluka"
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.type === "add" ? (
          <>
            <CustomButton
              name="Submit"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => departmentSubmit()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => departmentManagementCancel()}
            />
          </>
        ) : props.type === "delete" ? (
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => departmentManagementDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => departmentManagementCancel()}
            />
          </>
        ) : (
          props.type === "edit" && (
            <>
              <CustomButton
                name="Update"
                color="#FFFFFF"
                bgColor="#FA6130"
                onClick={() => departmentSubmit()}
              />
              <CustomButton
                name="Cancel"
                color="#000000"
                bgColor="#FFFFFF"
                border="1px solid #000000"
                onClick={() => departmentManagementCancel()}
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
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };

  const questionManagementCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.modalShow}
      backdrop="static"
    >
      <Modal.Header>
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
export const ClientManagementModal = (props) => {
  const dispatch = useDispatch();
  const clientDelete = () => {
    dispatch(clientManagementAction.deleteClient(props.action));
    props.setModalShow(false);
  };
  const clientCancel = () => {
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
        <Modal.Title
          style={{ color: "#000" }}
          id="contained-modal-title-vcenter"
        >
          Delete Client
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        {
          "Do you want to delete this client, this can't be undone, client will removed from list."
        }
      </Modal.Body>
      <Modal.Footer>
        <>
          <CustomButton
            name="Delete"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => clientDelete()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => clientCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};
export const MembershipModal = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const membershipDelete = () => {
    dispatch(membershipManagementActions.deleteMembership(props.action));
    props.setModalShow(false);
    if (props?.redirect) router.push(props?.redirect);
  };
  const membershipCancel = () => {
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
        <Modal.Title
          style={{ color: "#000" }}
          id="contained-modal-title-vcenter"
        >
          Delete  Membership
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        {
          "Do you want to delete this membership , this can't be undone, membership  will removed from list."
        }
      </Modal.Body>
      <Modal.Footer>
        <>
          <CustomButton
            name="Delete"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => membershipDelete()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => membershipCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};
export const QuotationModal = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const quotationDelete = () => {
    // dispatch(membershipManagementActions.deleteMembership(props.action));
    // props.setModalShow(false);
    // if (props?.redirect) router.push(props?.redirect);
    console.log('quote delete');
  };
  const quotationCancel = () => {
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
        <Modal.Title
          style={{ color: "#000" }}
          id="contained-modal-title-vcenter"
        >
          Delete  Quotation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        {
          "Do you want to delete this quotation , this can't be undone, quotation  will removed from list."
        }
      </Modal.Body>
      <Modal.Footer>
        <>
          <CustomButton
            name="Delete"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => quotationDelete()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => quotationCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};
export const EmployeeModal = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const employeeDelete = () => {
    dispatch(employeeManagementAction.deleteEmployee(props.action));
    props.setModalShow(false);
    if (props?.redirect) router.push(props?.redirect);
  };
  const employeeCancel = () => {
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
        <Modal.Title
          style={{ color: "#000" }}
          id="contained-modal-title-vcenter"
        >
          Delete Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        {
          "Do you want to delete this Employee, this can't be undone, Employee will removed from list."
        }
      </Modal.Body>
      <Modal.Footer>
        <>
          <CustomButton
            name="Delete"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => employeeDelete()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => employeeCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};
export const TrustedPartnerModal = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const trustedPartnerDelete = () => {
    dispatch(trustedPartnerManagementActions.deleteTrustedPartner(props.action));
    props.setModalShow(false);
    if (props?.redirect) router.push(props?.redirect);
  };
  const trustedPartnerCancel = () => {
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
        <Modal.Title
          style={{ color: "#000" }}
          id="contained-modal-title-vcenter"
        >
          Delete Trusted Partner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        {
          "Do you want to delete this trusted partner, this can't be undone, trusted partner will removed from list."
        }
      </Modal.Body>
      <Modal.Footer>
        <>
          <CustomButton
            name="Delete"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => trustedPartnerDelete()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => trustedPartnerCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};
export const ChannelPartnerModal = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const channelPartnerDelete = () => {
    dispatch(channelPartnerManagementActions.deleteChannelPartner(props.action));
    props.setModalShow(false);
    if (props?.redirect) router.push(props?.redirect);
  };
  const channelPartnerCancel = () => {
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
        <Modal.Title
          style={{ color: "#000" }}
          id="contained-modal-title-vcenter"
        >
          Delete Channel Partner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        {
          "Do you want to delete this channel partner, this can't be undone, channel partner will removed from list."
        }
      </Modal.Body>
      <Modal.Footer>
        <>
          <CustomButton
            name="Delete"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => channelPartnerDelete()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => channelPartnerCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};
export const DepartmentModal = (props) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const departmentDelete = () => {
    console.log('department delete!');
  };
  const departmentDeleteCancel = () => {
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
        <Modal.Title
          style={{ color: "#000" }}
          id="contained-modal-title-vcenter"
        >
          Delete Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        {
          "Do you want to delete this Department, this can't be undone, Department will removed from list."
        }
      </Modal.Body>
      <Modal.Footer>
        <>
          <CustomButton
            name="Delete"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => departmentDelete()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => departmentDeleteCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};

export const UserInputManagementModal = (props) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    fieldName: "",
    fieldType: null,
    fieldTypeId: null,
  });

  const subsidyDetails = useSelector((state) => state?.subsidy);

  const mergedData =
    subsidyDetails?.user_input_field_names !== undefined
      ? [
        ...subsidyDetails?.user_input_field_names?.questions,
        ...subsidyDetails?.user_input_field_names?.reports,
      ]
      : [];

  useEffect(() => {
    dispatch(
      subsidyManagementAction?.getUserInputFieldNames(
        subsidyDetails?.subsidy_details?.id
      )
    );
  }, [subsidyDetails?.subsidy_details?.id]);

  const handleSelect = (e) => {
    const { name, value } = e.target;
    const selectedOption = e.target.options[e.target.selectedIndex];

    if (name === "fieldName") {
      let list = { ...userInput };
      list = {
        ...list,
        fieldName: selectedOption?.text,
        fieldType: selectedOption?.value,
      };
      setUserInput(list);
    }

    if (name === "fieldTypeId") {
      let list = { ...userInput };
      list = {
        ...list,
        fieldTypeId: selectedOption?.value,
      };
      setUserInput(list);
    }
    // setUserInput((prevState) => ({
    //   ...prevState,
    //   [name]: selectedOption?.text,
    // }));
  };

  const addUserInputManagement = () => {
    const data = {
      user_input_list: [
        {
          display_name: userInput?.fieldName,
          field_name: userInput?.fieldName,
          field_type: parseInt(userInput?.fieldType),
          filed_type_id: parseInt(userInput?.fieldTypeId),
        },
      ],
      scheme_id: subsidyDetails?.subsidy_details?.id,
    };

    dispatch(subsidyManagementAction.createUserInputs(data));
    setUserInput({
      fieldName: "",
      fieldType: "",
      fieldTypeId: "",
    });
    props.setModalShow(false);
  };

  // useEffect(() => {
  //   dispatch(subsidyManagementAction.getConstant());
  // }, []);
  // useEffect(() => {
  //   setAllConstantList(allList);
  // }, [allList]);

  // const constantSearch = (value) => {
  //   console.log(value?.length, previousQuery?.length);
  //   console.log(value);
  //   if (value.trim() === "") {
  //     setAllConstantList(allList);
  //   } else if (value?.length <= previousQuery?.length) {
  //     console.log(value, "LLLLLLLLLLLLL");
  //     const filteredResults = allConstantList?.filter(
  //       (item) =>
  //         item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
  //         item?.value?.toLowerCase().includes(value?.toLowerCase())
  //     );
  //     console.log(filteredResults);
  //     // setAllConstantList(filteredResults);
  //     // setPreviousQuery(value);
  //   } else {
  //     const filteredResults = allConstantList?.filter(
  //       (item) =>
  //         item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
  //         item?.value?.toLowerCase().includes(value?.toLowerCase())
  //     );
  //     setAllConstantList(filteredResults);
  //     setPreviousQuery(value);
  //   }
  // };

  // const handleItemClick = (item) => {
  //   if (selectedItems?.some((selectedItem) => selectedItem.id === item.id)) {
  //     setSelectedItems(
  //       selectedItems?.filter((selectedItem) => selectedItem?.id !== item?.id)
  //     );
  //   } else {
  //     setSelectedItems([...selectedItems, item]);
  //   }
  // };

  // const removeSelectedItem = (item) => {
  //   setSelectedItems(
  //     selectedItems?.filter(
  //       (selectedItem, idx) => selectedItem?.id !== item?.id
  //     )
  //   );
  // };

  const userInputManagementCancel = () => {
    props.setModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">User Input</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-6">
            {/* <h5>Search Input</h5> */}
            <select
              name="fieldName"
              className="form-control"
              onChange={(e) => handleSelect(e)}
            >
              <option value="none">Select Field Name</option>
              {mergedData?.map((queName, idx) => {
                {
                  console.log(queName);
                }
                return (
                  <option key={idx} value={queName?.id}>
                    {queName?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-sm-6">
            {/* <h5>Search Input</h5> */}
            <select
              name="fieldTypeId"
              className="form-control"
              onChange={(e) => handleSelect(e)}
            >
              <option value="none">Select Field Type</option>
              <option value="1">String</option>
              <option value="2">Integer</option>
              <option value="3">Float</option>
            </select>
          </div>
          {/* {allConstantList?.length > 0 && ( */}
          {/* <div>
            <ul className="form-control">
              {allConstantList?.map((constant, index) => {
                return (
              <>
                <li>
                  <input
                    type="checkbox"
                    readonly
                    className="me-2"
                    checked={selectedItems?.some(
                      (selectedItem) => selectedItem.id === constant?.id
                    )}
                    onClick={() => handleItemClick(constant)}
                  />
                  {constant?.name} = {constant?.value}
                </li>
              </>
             );
              })}
            </ul>
          </div> */}
          {/* )} */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <div className="d-flex">
            {/* {selectedItems?.map((item, index) => {
              return (
                <div
                  style={{
                    border: "1px solid black",
                    borderRadius: "10px",
                    marginRight: "10px",
                    padding: "5px",
                    position: "relative",
                  }}
                >
                  {item?.name}
                  <RxCross2
                    onClick={() => removeSelectedItem(item)}
                    style={{
                      position: "absolute",
                      top: "-15px",
                      right: "-4px",
                    }}
                  />
                </div>
              );
            })} */}
          </div>
          <CustomButton
            name="Add"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => addUserInputManagement()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => userInputManagementCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};

export const ConstantManagementModal = (props) => {
  const dispatch = useDispatch();
  const [constant, setConstant] = useState({
    constantName: "",
    constantValue: "",
    constantType: "",
  });
  const [allConstantList, setAllConstantList] = useState();
  const [previousQuery, setPreviousQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const constantList = useSelector((state) => state?.subsidy);
  const allList =
    constantList?.constant_list?.length > 0 ? constantList?.constant_list : [];
  const subsidyDetails = useSelector(
    (state) => state?.subsidy?.subsidy_details
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConstant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createConstant = () => {
    const data = {
      name: constant?.constantName,
      constant_value: constant?.constantValue,
      constant_type: constant?.constantType,
    };
    dispatch(subsidyManagementAction.createConstant(data));
    setConstant({
      constantName: "",
      constantValue: "",
      constantType: "",
    });
  };

  useEffect(() => {
    dispatch(subsidyManagementAction.getConstant());
  }, []);
  useEffect(() => {
    setAllConstantList(allList);
  }, [allList]);

  const constantSearch = (value) => {
    if (value.trim() === "") {
      setAllConstantList(allList);
    } else if (value?.length <= previousQuery?.length) {
      const filteredResults = allConstantList?.filter(
        (item) =>
          item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
          item?.value?.toLowerCase().includes(value?.toLowerCase())
      );

      // setAllConstantList(filteredResults);
      // setPreviousQuery(value);
    } else {
      const filteredResults = allConstantList?.filter(
        (item) =>
          item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
          item?.value?.toLowerCase().includes(value?.toLowerCase())
      );
      setAllConstantList(filteredResults);
      setPreviousQuery(value);
    }
  };

  const handleItemClick = (item) => {
    if (selectedItems?.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(
        selectedItems?.filter((selectedItem) => selectedItem?.id !== item?.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeSelectedItem = (item) => {
    setSelectedItems(
      selectedItems?.filter(
        (selectedItem, idx) => selectedItem?.id !== item?.id
      )
    );
  };

  const constantManagementCancel = () => {
    props.setModalShow(false);
  };

  const addConstantManagement = () => {
    const data = {
      constant_id_list: selectedItems?.map((item) => item.id),
      scheme_id: subsidyDetails?.id,
    };
    dispatch(subsidyManagementAction.addConstantToSubsidy(data));
    setSelectedItems([]);
    props.setModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Constants
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-3">
            <input
              type="text"
              name="constantName"
              value={constant?.constantName}
              placeholder="Constant Name"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="number"
              name="constantValue"
              value={constant?.constantValue}
              placeholder="Constant Value"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-sm-3">
            <select
              name="constantType"
              className="form-control"
              onChange={(e) => handleChange(e)}
              placeholder="Select Type"
            >
              <option value="none">Select Type</option>
              <option value="1">Integer</option>
              <option value="2">Percentage</option>
            </select>
          </div>
          <div className="col-sm-3">
            <CustomButton
              name="Create"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => createConstant()}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div>
            <h5>Search Constant</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={(e) => constantSearch(e.target.value)}
            />
          </div>
          {allConstantList?.length > 0 && (
            <div>
              <ul className="form-control">
                {allConstantList?.map((constant, index) => {
                  return (
                    <>
                      <li key={index}>
                        <input
                          type="checkbox"
                          readonly
                          className="me-2"
                          checked={selectedItems?.some(
                            (selectedItem) => selectedItem.id === constant?.id
                          )}
                          onClick={() => handleItemClick(constant)}
                        />
                        {constant?.name} = {constant?.value}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <div className="d-flex">
            {selectedItems?.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid black",
                    borderRadius: "10px",
                    marginRight: "10px",
                    padding: "5px",
                    position: "relative",
                  }}
                >
                  {item?.name}
                  <RxCross2
                    onClick={() => removeSelectedItem(item)}
                    style={{
                      position: "absolute",
                      top: "-15px",
                      right: "-4px",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <CustomButton
            name="Add"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={() => addConstantManagement()}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={() => constantManagementCancel()}
          />
        </>
      </Modal.Footer>
    </Modal>
  );
};

export const SubsidyManagementModal = (props) => {
  const id = props?.action?.id;
  const scheme_id = props?.action?.scheme_id;
  console.log(props, id, scheme_id, ":::::::::::::::::::::::::::");
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (props?.type === "subsidyDelete") {
      dispatch(subsidyManagementAction.deleteSubsidy(id));
    } else {
      dispatch(subsidyManagementAction.deleteCondition({ id, scheme_id }));
    }
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const handleCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  return (
    <>
      <Modal
        {...props}
        show={props.modalShow}
        // onHide = { handleClose };
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props?.type === "subsidyDelete"
              ? "Delete Subsidy"
              : "Delete Constant"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props?.type === "subsidyDelete"
            ? "Do you want to delete this subsidy, this can't be undone, subsidy will removed from list."
            : "Do you want to delete this condition, this can't be undone, condition will removed from list."}
        </Modal.Body>
        <Modal.Footer>
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => handleDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => handleCancel()}
            />
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const MatchingCriteriaModal = (props) => {
  const id = props?.action?.id;
  const scheme_id = props?.action?.scheme_id;
  const dispatch = useDispatch();

  console.log(id, scheme_id);
  const criteriaDelete = () => {
    dispatch(subsidyManagementAction.deleteCriteria({ id, scheme_id }));
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  const criteriaCancel = () => {
    props.setModalShow(false);
    props.setType("");
    props.setAction({});
  };
  return (
    <>
      <Modal
        {...props}
        show={props.modalShow}
        // onHide = { handleClose };
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Criteria
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete this criteria, this cant be undone, criteria
          will removed from list.
        </Modal.Body>
        <Modal.Footer>
          <>
            <CustomButton
              name="Delete"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={() => criteriaDelete()}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={() => criteriaCancel()}
            />
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

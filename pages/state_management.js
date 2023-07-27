import styles from "../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "../components/Common/CustomButton";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getStateManagementLists,
  stateManagementAction,
} from "../redux/Actions/stateManagementAction";
import { StateManagementModal } from "../components/Common/Modal";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ArrowUpLine } from "@rsuite/icons";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

function StateManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});

  const actions = [{ icon: MdModeEdit }, { icon: RiDeleteBin5Fill }];
  const stateManagement = useSelector((state) => state?.state);

  const addNewState = () => {
    setModalShow(true);
    setType("add");
  };
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(stateManagementAction?.getStates());
  }, [
    stateManagement?.isCreated,
    stateManagement?.isUpdated,
    stateManagement?.isDeleted,
  ]);
  const [stateName, setStateName] = useState(1)
  const [sortHeader, setSortHeader] = useState('name')
  const handleClick = (e, item, idx) => {
    console.log(e, item, idx);
    if (idx === 0) {
      setModalShow(true);
      setType("edit");
      setAction(item);
    } else {
      setModalShow(true);
      setType("delete");
      setAction(item?.id);
    }
  };

  return (
    <div className={styles.container}>
      {modalShow && (
        <StateManagementModal
          type={type}
          setType={setType}
          action={action}
          setAction={setAction}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      <div className={styles.tablee}>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
        >
          <div className="d-flex justify-content-evenly ">
            <div className={`mx-2 ${styles.search_box}`}>
              <Form.Group className="mb-3" controlId="search">
                <InputGroup>
                  <Button disabled style={{
                    color: "black", background: "white", borderColor: "white", borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px", border: "2px solid rgba(0,0,0,0.2)", borderRight: "none"
                  }}   >
                    {<CiSearch />}
                  </Button>
                  <Form.Control
                    autoComplete="off"
                    style={{
                      padding: "0.5rem",
                      border: "2px solid rgba(0,0,0,0.2)",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                      borderLeft: "none"
                    }}
                    placeholder="Search..."
                    type={'text'}
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                  />
                </InputGroup>
              </Form.Group>
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New State"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewState}
              />
            </div>
            {/* 
            <ExportButton name="Export List" /> */}
          </div>
        </div>
        <div className={styles.tableBody}>
          <table className="table table-hover">
            <thead>
              <tr className="text-center">
                <th className="p-4" scope="col">ID </th>
                <th className="p-4" scope="col">State{" "}<span style={{ cursor: 'pointer', fontSize: '1rem' }} onClick={() => { setStateName(stateName * -1) }} >{stateName === -1 ? <IoMdArrowUp /> : <IoMdArrowDown />}</span> </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stateManagement?.stateManagementData && stateManagement?.stateManagementData?.filter(x => (x?.name?.toLowerCase().includes(search.toLowerCase()))).sort((a, b) => (a?.[sortHeader] > b?.[sortHeader] ? stateName : -stateName)).map((data, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <th scope="row">{data?.id}</th>
                    <td>{data?.name} </td>
                    <td>
                      <ul className="d-flex justify-content-center">
                        {actions?.map(({ icon: Icon }, idx) => {
                          return (
                            <li
                              key={idx}
                              onClick={(e) => handleClick(e, data, idx)}
                            >
                              <Icon
                                color="#FA6130"
                                size="18px"
                                className="ms-2 action_icon"
                              />
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

export default StateManagement;

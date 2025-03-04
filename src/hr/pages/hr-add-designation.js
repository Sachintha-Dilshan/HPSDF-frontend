import {useState, useEffect} from 'react';
import HRCollapseBar from "../components/hr-collapse-bar";
import designationService from "../services/add-designation-service";

import { FloatingLabel, Table, Button, Modal } from "flowbite-react";

import { HiOutlineSave, HiDocumentDuplicate } from "react-icons/hi";
import { FaSyncAlt, FaEraser } from "react-icons/fa";
import {
  MdDelete,
  MdError,
  MdDoneOutline,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import userRoles from "../../data/user-roles";

function HRAddDesignations() {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const [designationName, setDesignationName] = useState("");
  const [designationData, setDesignationData] = useState([]);
  const [designationId, setDesignationId] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const fetchAllData = () => {
    designationService
      .getAllDesignations()
      .then((response) => {
        setDesignationData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

useEffect(() => {
    fetchAllData();
  }, []);

  // const fetchRealTimeData = () => {
  //   LeaveTypeService.findByLeaveName(leaveName)
  //     .then((response) => {
  //       setLeaveData(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const fetchLeaveTypeByName = () => {
  //   LeaveTypeService.findByLeaveName(leaveName)
  //     .then((response) => {
  //       alert(response.data.leaveType + " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (designationName) {
      var data = {
        designationName: designationName,
      };
      designationService
        .findByDesignationName(designationName)
        .then((response) => {
          setMessage(
            response.data.designationName + " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත"
          );
          setTitle("Duplicate");
          setOpenModal(true);
          setDesignationName("");
          setDesignationId("");
          return;
        })
        .catch(() => {
          designationService
            .addDesignation(data)
            .then((response) => {
              setMessage(
                response.data.designationName +
                  " පද්ධතියට සාර්ථකව ඇතුලත් කරන ලදී"
              );
              setTitle("Success");
              setOpenModal(true);

              fetchAllData();
              setDesignationName("");
              setDesignationId("");
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        });
    } else {
      setMessage("තනතුර ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const updateData = () => {
    if (designationName && designationId) {
      designationService
        .findByDesignationName(designationName)
        .then((response) => {
          setMessage(
            response.data.designationName + " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත"
          );
          setTitle("Duplicate");
          setOpenModal(true);
          setDesignationName("");
          setDesignationId("");
          return;
        })
        .catch(() => {
          var data = {
            id: designationId,
            designationName: designationName,
          };
          designationService
            .updateDesignation(data, designationId)
            .then((response) => {
              setMessage(
                response.data.designationName + " සාර්ථකව යාවත්කාලීන කරන ලදී"
              );
              setTitle("Success");
              setOpenModal(true);
              fetchAllData();
              setDesignationName("");
              setDesignationId("");
            })
            .catch((error) => {
              alert(error.response.data.designationName);
            });
        });
    } else {
      setMessage("කරුණාකර පළමුව අදාල තනතුර තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const deleteData = () => {
    if (designationId && designationName) {
      setMessage(
        "ඔබට " + designationName + " පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද ?"
      );
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("කරුණාකර පළමුව අදාල තනතුර තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const handleClick = (designationName, designationId) => {
    setDesignationName(designationName);
    setDesignationId(designationId);
  };

  return (
    <main>
      <HRCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Change Designations
        </h3>

        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          {currentUser.includes(roles.hrAdmin) && (<form onSubmit={handleSubmit}>
          <fieldset className="border rounded-lg grid lg:grid-cols-6 p-5 md:gap-10 gap-5 m-5">

              <FloatingLabel
                variant="filled"
                label="අනු අංකය"
                value={designationId}
                disabled
                className="cursor-not-allowed bg-slate-200"
              />
              <FloatingLabel
                variant="filled"
                label="තනතුර"
                value={designationName}
                onChange={(event) => {
                  setDesignationName(event.target.value);
                }}
              />
                <Button className="uppercase h-12" type="submit">
                  {" "}
                  <HiOutlineSave className="mr-2 h-5 w-5" />
                  Add Designation
                </Button>
                <Button
                  className="uppercase h-12"
                  color="purple"
                  onClick={updateData}
                >
                  {" "}
                  <FaSyncAlt className="mr-2 h-5 w-5" />
                  Update Designation
                </Button>
                <Button
                  className="uppercase h-12"
                  color="failure"
                  onClick={deleteData}
                >
                  {" "}
                  <MdDelete className="mr-2 h-5 w-5" />
                  Delete Designation
                </Button>
                <Button
                  className="uppercase bg-slate-600 h-12"
                  onClick={() => {
                    setDesignationId("");
                    setDesignationName("");
                  }}
                >
                  {" "}
                  <FaEraser className="mr-2 h-5 w-5" />
                  Clear Designaton
                </Button>
            </fieldset>
          </form> )}
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>අනු අංකය</Table.HeadCell>
              <Table.HeadCell>තනතුර</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {designationData &&
                designationData.map((designation) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={designation.designationId}
                      onClick={() =>
                        handleClick(
                          designation.designationName,
                          designation.designationId
                        )
                      }
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {designation.designationId}
                      </Table.Cell>
                      <Table.Cell
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                        key={designation.designationId}
                      >
                        {designation.designationName}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
      </div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {title === "Error" && (
            <MdError className="inline-block text-red-500 text-4xl mr-5" />
          )}
          {title === "Empty" && (
            <MdRadioButtonUnchecked className="inline-block text-red-500 text-4xl mr-5" />
          )}
          {title === "Duplicate" && (
            <HiDocumentDuplicate className="inline-block text-yellow-400 text-4xl mr-5" />
          )}
          {title === "Warning" && (
            <IoIosWarning className="inline-block text-amber-500 text-4xl mr-5" />
          )}
          {title === "Success" && (
            <MdDoneOutline className="inline-block text-lime-600 text-4xl mr-5" />
          )}
          {title}
        </Modal.Header>
        <Modal.Body>
          <div>{message}</div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <Button
            onClick={() => {
              designationService
                .removeDesignation(designationId)
                .then((response) => {
                  setShow(false);
                  setMessage(
                    designationName + " පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී "
                  );
                  setTitle("Success");
                  fetchAllData();
                  setOpenModal(true);
                  setDesignationName("");
                  setDesignationId("");
                })
                .catch((e) => {
                  console.log(e);
                });
              setOpenModal(false);
            }}
            style={{ display: show ? "block" : "none" }}
            color="failure"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default HRAddDesignations;

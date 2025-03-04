import {useState, useEffect} from "react";
import LeaveCollapseBar from "../components/hr-leave-collapse-bar";
import LeaveTypeService from "../services/leave-type-service";

import { FloatingLabel, Table, Button, Modal } from "flowbite-react";

import { HiOutlineSave } from "react-icons/hi";
import { FaSyncAlt, FaEraser } from "react-icons/fa";
import { MdDelete, MdError, MdDoneOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";


function HRLeaveAddLeaves() {
  const [leaveName, setLeaveName] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [leaveId, setLeaveId] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const fetchAllData = () => {
    LeaveTypeService.getAllLeaveTypes()
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

useEffect(() => {
    fetchAllData();
  }, []);

  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (leaveName) {
      var data = {
        leaveType: leaveName,
      };
      LeaveTypeService.findByLeaveName(leaveName)
        .then((response) => {
          setMessage(
            response.data.leaveType + " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත"
          );
          setTitle("Error");
          setOpenModal(true);
          setLeaveName("");
          setLeaveId("");
          return;
        })
        .catch(() => {
          LeaveTypeService.createLeaveType(data)
            .then(() => {
              setMessage(
                leaveName + " පද්ධතියට සාර්ථකව ඇතුලත් කරන ලදී" 
              );
              setTitle("Success");
              setOpenModal(true);

              fetchAllData();
              setLeaveName("");
              setLeaveId("");
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        });
    } else {
      setMessage("නිවාඩු වර්ගය ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Error");
      setOpenModal(true);
    }
  };

  const updateData = () => {
    if (leaveName && leaveId) {
      LeaveTypeService.findByLeaveName(leaveName)
        .then((response) => {
          setMessage(
            response.data.leaveType + " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත"
          );
          setTitle("Error");
          setOpenModal(true);
          setLeaveName("");
          setLeaveId("");
          return;
        })
        .catch(() => {
          var data = {
            id: leaveId,
            leaveType: leaveName,
          };
          
          LeaveTypeService.updateLeaveType(data, leaveId)
            .then(() => {
              setMessage(
                leaveName + " සාර්ථකව යාවත්කාලීන කරන ලදී"
              );
              setTitle("Success");
              setOpenModal(true);
              fetchAllData();
              setLeaveName("");
              setLeaveId("");
            })
            .catch((error) => {
              alert(error.response.data.leaveType);
            });
        });
    } else {
      setMessage("කරුණාකර පළමුව නිවාඩු වර්ගයක් තෝරන්න");
      setTitle("Error");
      setOpenModal(true);
    }
  };

  const deleteData = () => {
    if (leaveId && leaveName) {
      setMessage("ඔබට " + leaveName + " පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද ?");
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("කරුණාකර පළමුව නිවාඩු වර්ගයක් තෝරන්න");
      setTitle("Error");
      setOpenModal(true);
    }
  };

  const handleClick = (leaveType, leaveId) => {
    setLeaveName(leaveType);
    setLeaveId(leaveId);
  };

  return (
    <main>
      <LeaveCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Change Leave Types
        </h3>
        {/* Personal details starts here */}
        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded-lg flex items-center justify-center lg:flex-row  flex-col p-5 md:gap-10 gap-5 m-5">
              <legend className="text-slate-600">නිවාඩු තොරතුරු</legend>
              <FloatingLabel
                variant="filled"
                label="අනු අංකය"
                value={leaveId}
                disabled
                className="w-24 cursor-not-allowed"
              />
              <FloatingLabel
                variant="filled"
                label="නිවාඩු වර්ගය"
                className="w-96"
                value={leaveName}
                onChange={(event) => {
                  setLeaveName(event.target.value);
                }}
              />

<div className="grid lg:grid-cols-4 gap-5">
                <Button className="uppercase" type="submit">
                  {" "}
                  <HiOutlineSave className="mr-2 h-5 w-5" />
                  Add Leave
                </Button>
                <Button
                  className="uppercase"
                  color="purple"
                  onClick={updateData}
                >
                  {" "}
                  <FaSyncAlt className="mr-2 h-5 w-5" />
                  Update Leave
                </Button>
                <Button
                  className="uppercase"
                  color="failure"
                  onClick={deleteData}
                >
                  {" "}
                  <MdDelete className="mr-2 h-5 w-5" />
                  Delete Leave
                </Button>
                <Button
                  className="uppercase bg-slate-600"
                  onClick={() => {
                    setLeaveId("");
                    setLeaveName("");
                  }}
                >
                  {" "}
                  <FaEraser className="mr-2 h-5 w-5" />
                  Clear Leave
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>අනු අංකය</Table.HeadCell>
              <Table.HeadCell>නිවාඩු වර්ග</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {leaveData &&
                leaveData.map((leave) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={leave.id}
                      onClick={() => handleClick(leave.leaveType, leave.id)}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {leave.id}
                      </Table.Cell>
                      <Table.Cell
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                        key={leave.id}
                      >
                        {leave.leaveType}
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
          {title === "Warning" && (
            <IoIosWarning className="inline-block text-amber-500 text-4xl mr-5" />
          )}
          {title === "Success" && (
            <MdDoneOutline className="inline-block text-lime-600 text-4xl mr-5" />
          )}{" "}
          {title}
        </Modal.Header>
        <Modal.Body>
          <div>{message}</div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <Button
            onClick={() => {
              LeaveTypeService.removeLeaveType(leaveId)
                .then((response) => {
                  fetchAllData();
                  setLeaveName("");
                  setLeaveId("");
                  // setMessage(response.data);
                  // alert(response.data);
                  setShow(false);
                  setMessage(
                    leaveName + " පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී "
                  );
                  setTitle("Success");
                  setOpenModal(true);
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

export default HRLeaveAddLeaves;

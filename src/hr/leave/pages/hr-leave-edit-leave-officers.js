import { useState, useEffect } from "react";
import LeaveCollapseBar from "../components/hr-leave-collapse-bar";
import editLeaveOfficerService from "../services/leave-edit-leave-officers-service";

import { FloatingLabel, Table, Button, Modal } from "flowbite-react";

import { HiOutlineSave, HiDocumentDuplicate } from "react-icons/hi";
import { FaEraser } from "react-icons/fa";
import {
  MdDelete,
  MdError,
  MdDoneOutline,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

function HREditLeaveOfficers() {
  const [headName, setHeadName] = useState("");
  const [headDesignation, setHeadDesignation] = useState("");
  const [nicNo, setNicNo] = useState("");
  const [heads, setHeads] = useState([]);

  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorDesignation, setSupervisorDesignation] = useState("");
  const [leaveId, setLeaveId] = useState("");
  const [supervisorNicNo, setSupervisorNicNo] = useState("")
  const [supervisors, setSupervisors] = useState([]);

  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const getHeads = async () => {
    try {
      const response = await editLeaveOfficerService.getLeaveOfficers(
        "ROLE_CHAIRMAN"
      );
      setHeads(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  const getSupervisors = async () => {
    try {
      const response = await editLeaveOfficerService.getLeaveOfficers(
        "ROLE_SECRETARY"
      );
      setSupervisors(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getHeads();
    getSupervisors();
  }, []);

  useEffect(() => {
    if (nicNo === "") {
      setHeadName("");
      setHeadDesignation("");
    } else {
      editLeaveOfficerService
        .getLeaveOfficerByNic(nicNo)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            // Check if response data exists and is not empty
            const [name, designation] = response.data[0];
            setHeadName(name);
            setHeadDesignation(designation);
          } else {
            // If response data is empty, reset the state variables
            setHeadName("");
            setHeadDesignation("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [nicNo]);

  useEffect(() => {
    if (leaveId === "") {
      setSupervisorName("");
      setSupervisorDesignation("");
    } else {
      editLeaveOfficerService
        .getLeaveOfficerByLeaveId(leaveId)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            // Check if response data exists and is not empty
            const [nicNo ,name, designation] = response.data[0];
            setSupervisorNicNo(nicNo);
            setSupervisorName(name);
            setSupervisorDesignation(designation);
          } else {
            // If response data is empty, reset the state variables
            setSupervisorName("");
            setSupervisorDesignation("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [leaveId]);

  const addHead = async () => {
    try {
      if (nicNo === "") {
        setMessage("ජාතික හැදුනුම්පත් අංකය ඇතුලත් කිරීම අනිවාර්යයි.");
        setTitle("Empty");
        setOpenModal(true);
        getHeads();
      } else {
        const head = {
          nicNo: nicNo,
          role: "ROLE_CHAIRMAN",
        };
        const response = await editLeaveOfficerService.addLeaveOfficer(head);

        setMessage(response.data.nicNo + " පද්ධතියට සාර්ථකව ඇතුලත් කරන ලදී.");
        setTitle("Success");
        setOpenModal(true);
        getHeads();

        setNicNo("");
        setHeadName("");
        setHeadDesignation("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
        setTitle("Error");
        setOpenModal(true);
      }
    }
  };

  const addSupervisor = async () => {
    try {
      if (leaveId === "") {
        setMessage("නිවාඩු අංකය ඇතුලත් කිරීම අනිවාර්යයි.");
        setTitle("Empty");
        setOpenModal(true);
        getHeads();
      } else {
        const supervisor = {
          nicNo: supervisorNicNo,
          role: "ROLE_SECRETARY",
        };
        const response = await editLeaveOfficerService.addLeaveOfficer(
          supervisor
        );

        setMessage(response.data.nicNo + " පද්ධතියට සාර්ථකව ඇතුලත් කරන ලදී.");
        setTitle("Success");
        setOpenModal(true);
        getSupervisors();

        setLeaveId("");
        setSupervisorName("");
        setSupervisorDesignation("");
        setSupervisorNicNo("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
        setTitle("Error");
        setOpenModal(true);
      }
    }
  };

  const deleteHead = () => {
    if (nicNo !== "" && headName !== "" && headDesignation !== "") {
      setMessage("ඔබට " + nicNo + " පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද ?");
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("කරුණාකර පළමුව ඉවත් කිරීමට අවශ්‍ය දත්තය වගුවෙන් තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const deleteSupervisor = () => {
    if (
      leaveId !== "" &&
      supervisorName !== "" &&
      supervisorDesignation !== "" &&
      supervisorNicNo !== ""
    ) {
      setMessage("ඔබට " + supervisorName + " පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද ?");
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("කරුණාකර පළමුව ඉවත් කිරීමට අවශ්‍ය දත්තය වගුවෙන් තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  return (
    <main>
      <LeaveCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Edit Leave Officers
        </h3>

        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          <form>
            <fieldset className="border rounded-lg grid lg:grid-cols-6 p-5 md:gap-10 gap-5 m-5">
              <legend className="text-slate-600">දෙපාර්තමේන්තු ප්‍රධානි</legend>
              <FloatingLabel
                variant="filled"
                label="ජාතික හැදුනුම්පත් අංකය"
                value={nicNo}
                onChange={(event) => {
                  setNicNo(event.target.value);
                }}
              />
              <FloatingLabel
                variant="filled"
                label="නම"
                disabled
                className="cursor-not-allowed bg-slate-200"
                value={headName}
                onChange={(event) => {
                  setHeadName(event.target.value);
                }}
              />
              <FloatingLabel
                variant="filled"
                label="තනතුර"
                disabled
                className="cursor-not-allowed bg-slate-200"
                value={headDesignation}
                onChange={(event) => {
                  setHeadDesignation(event.target.value);
                }}
              />
              <Button className="uppercase h-12" onClick={addHead}>
                <HiOutlineSave className="mr-2 h-5 w-5" />
                Add
              </Button>
              <Button
                className="uppercase h-12"
                color="failure"
                onClick={deleteHead}
              >
                <MdDelete className="mr-2 h-5 w-5" />
                Delete
              </Button>
              <Button
                className="uppercase bg-slate-600 h-12"
                onClick={() => {
                  setNicNo("");
                  setHeadDesignation("");
                  setHeadName("");
                }}
              >
                <FaEraser className="mr-2 h-5 w-5" />
                Clear
              </Button>
            </fieldset>
          </form>
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>තනතුර</Table.HeadCell>
              <Table.HeadCell>නම</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {heads &&
                heads.map((head) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={head[0]} // Using NIC number as the key
                      onClick={() => {
                        setNicNo(head[0]);
                        setHeadName(head[1]);
                        setHeadDesignation(head[2]);
                      }}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {head[2]} {/* Designation */}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {head[1]} {/* Name */}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>

        <fieldset className="border rounded-lg grid lg:grid-cols-6 p-5 md:gap-10 gap-5 m-5">
          <legend className="text-slate-600">අධීක්ෂණ නිලධාරි</legend>
          <FloatingLabel
            variant="filled"
            label="නිවාඩු අංකය"
            value={leaveId}
            onChange={(event) => {
              setLeaveId(event.target.value);
            }}
          />
          <FloatingLabel
            variant="filled"
            label="නම"
            disabled
            className="cursor-not-allowed bg-slate-200"
            value={supervisorName}
            onChange={(event) => {
              setSupervisorName(event.target.value);
            }}
          />
          <FloatingLabel
            variant="filled"
            label="තනතුර"
            disabled
            className="cursor-not-allowed bg-slate-200"
            value={supervisorDesignation}
            onChange={(event) => {
              setSupervisorDesignation(event.target.value);
            }}
          />
          <Button className="uppercase h-12" onClick={addSupervisor}>
            <HiOutlineSave className="mr-2 h-5 w-5" />
            Add
          </Button>
          <Button
            className="uppercase h-12"
            color="failure"
            onClick={deleteSupervisor}
          >
            <MdDelete className="mr-2 h-5 w-5" />
            Delete
          </Button>
          <Button
            className="uppercase bg-slate-600 h-12"
            onClick={() => {
              setLeaveId("");
              setSupervisorName("");
              setSupervisorDesignation("");
            }}
          >
            <FaEraser className="mr-2 h-5 w-5" />
            Clear
          </Button>
        </fieldset>

        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>තනතුර</Table.HeadCell>
              <Table.HeadCell>නම</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {supervisors &&
                supervisors.map((supervisor) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={supervisor[0]} // Using NIC number as the key
                      onClick={() => {
                        setSupervisorNicNo(supervisor[0]);
                        setSupervisorName(supervisor[1]);
                        setSupervisorDesignation(supervisor[2]);
                        setLeaveId(supervisor[3]);
                      }}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {supervisor[2]} {/* Designation */}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {supervisor[1]} {/* Name */}
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
              if(nicNo !=="" && headName !=="" && headDesignation !== ""){
                editLeaveOfficerService
                .removeLeaveOfficer(nicNo)
                .then(() => {
                  setShow(false);
                  setMessage(nicNo + " පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී ");
                  setTitle("Success");
                  getHeads();
                  setOpenModal(true);

                  setNicNo("");
                  setHeadName("");
                  setHeadDesignation("");
                })
                .catch((e) => {
                  console.log(e);
                });
              }

              if(supervisorNicNo !=="" && supervisorName !=="" && supervisorDesignation !=="" && leaveId !==""){
                editLeaveOfficerService
                .removeLeaveOfficer(supervisorNicNo)
                .then(() => {
                  setShow(false);
                  setMessage(supervisorNicNo + " පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී ");
                  setTitle("Success");
                  getSupervisors();
                  setOpenModal(true);

                  setSupervisorNicNo("");
                  setSupervisorName("");
                  setSupervisorDesignation("");
                  setLeaveId("");
                })
                .catch((e) => {
                  console.log(e);
                });
              }
              
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

export default HREditLeaveOfficers;

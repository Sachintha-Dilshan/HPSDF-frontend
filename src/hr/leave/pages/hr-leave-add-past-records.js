import { useState, useEffect } from "react";
import LeaveCollapseBar from "../components/hr-leave-collapse-bar";
import EmployeeService from "../../services/add-new-employee-service";
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
import PastRecordService from "../services/leave-type-past-record-service";

function HRLeaveAddPastRecords() {
  const [data, setData] = useState({
    leaveId: "",
    year: "",
    casualLeave: "",
    vacationLeave: "",
  });
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNicNo, setEmployeeNicNo] = useState("");
  const [leaveData, setLeaveData] = useState([]);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
 
  const resetData = () => {
    setData({
      leaveId: data.leaveId,
      year: "",
      casualLeave: "",
      vacationLeave: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  useEffect(() => {
    if (data.leaveId === "") {
      setLeaveData([]);
      setEmployeeName("");
    }
    if (data.leaveId && employeeName) {
      PastRecordService.getByNicNo(employeeNicNo)
        .then((response) => {
          setLeaveData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [data, employeeNicNo, employeeName]);

  useEffect(() => {
    if (data.leaveId) {
      EmployeeService.getEmployeeName(data.leaveId)
        .then((response) => {
          setEmployeeName(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      
      EmployeeService.getEmployeeNicNo(data.leaveId)
        .then((response) => {
          setEmployeeNicNo(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [data.leaveId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.leaveId && employeeName) {
      if (data.year === "") {
        setMessage("අදාල වර්ෂය ඇතුලත් කිරීම අනිවාර්යයයි.");
        setTitle("Empty");
        setOpenModal(true);
      } else if (data.casualLeave === "") {
        setMessage("අනියම් නිවාඩු ගණන ඇතුලත් කිරීම අනිවාර්යයයි.");
        setTitle("Empty");
        setOpenModal(true);
      } else if (data.vacationLeave === "") {
        setMessage("විවේක නිවාඩු ගණන ඇතුලත් කිරීම අනිවාර්යයයි.");
        setTitle("Empty");
        setOpenModal(true);
      } else {
        let record = {
          nicNo: employeeNicNo,
          year: data.year,
          casualLeave: data.casualLeave,
          vacationLeave: data.vacationLeave,
        };

        PastRecordService.add(record)
          .then((response) => {
            setMessage(
              response.data.year +
                " වර්ෂයට අදාල නිවාඩු ගණන සාර්ථකව ඇතුලත් කරන ලදී"
            );
            setTitle("Success");
            setOpenModal(true);
            resetData();
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              setMessage(error.response.data.error);
            } else {
              setMessage("දත්ත ඇතුලත් කිරීමේදී දෝෂයක් සිදු වී ඇත !");
            }
            setTitle("Error");
            setOpenModal(true);
          });
      }
    } else {
      setMessage("නිවාඩු අංකය ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const updateData = () => {
    if (data.leaveId && employeeName) {
      if (data.year === "") {
        setMessage("අදාල වර්ෂය ඇතුලත් කිරීම අනිවාර්යයයි.");
        setTitle("Empty");
        setOpenModal(true);
      } else if (data.casualLeave === "") {
        setMessage("අනියම් නිවාඩු ගණන ඇතුලත් කිරීම අනිවාර්යයයි.");
        setTitle("Empty");
        setOpenModal(true);
      } else if (data.vacationLeave === "") {
        setMessage("විවේක නිවාඩු ගණන ඇතුලත් කිරීම අනිවාර්යයයි.");
        setTitle("Empty");
        setOpenModal(true);
      } else {
        let record = {
          nicNo: employeeNicNo,
          year: data.year,
          casualLeave: data.casualLeave,
          vacationLeave: data.vacationLeave,
        };

        PastRecordService.update(record)
          .then((response) => {
            setMessage(
              response.data.year +
                " වර්ෂයට අදාල නිවාඩු ගණන සාර්ථකව යාවත්කාලීන කරන ලදී"
            );
            setTitle("Success");
            setOpenModal(true);
            resetData();
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              setMessage(error.response.data.error);
            } else {
              setMessage("දත්ත ඇතුලත් කිරීමේදී දෝෂයක් සිදු වී ඇත !");
            }
            setTitle("Error");
            setOpenModal(true);
          });
      }
    } else {
      setMessage("නිවාඩු අංකය ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const deleteData = () => {
      if (data.leaveId && data.year) {
        setMessage("ඔබට " + data.year + " අදාල නිවාඩු පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද ?");
        setTitle("Warning");
        setShow(true);
        setOpenModal(true);
      } else {
        setMessage(" කරුණාකර පළමුව පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍ය පේළිය වගුවෙන් තෝරන්න");
        setTitle("Error");
        setOpenModal(true);
      }
  };

  const handleClick = (year, casualLeave, vacationLeave) => {
    setData((prev) => {
      return {
        ...prev,
        year: year,
        casualLeave: casualLeave,
        vacationLeave: vacationLeave,
      };
    });
  };

  return (
    <main>
      <LeaveCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Add past leave records
        </h3>
        {/* Personal details starts here */}
        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          <fieldset className="border rounded-lg flex items-center justify-center lg:flex-row  flex-col p-5 md:gap-10 gap-5 m-5">
            <FloatingLabel
              variant="filled"
              label="නිවාඩු අංකය"
              // value={leaveId}
              className="w-32"
              name="leaveId"
              value={data.leaveId}
              onChange={handleChange}
            />
            <FloatingLabel
              variant="filled"
              label="නම"
              className="cursor-not-allowed"
              disabled
              name="employeeName"
              value={employeeName}
              onChange={(event) => {
                setEmployeeName(event.target.value);
              }}
            />
          </fieldset>
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded-lg grid items-center justify-center lg:grid-cols-7  p-5 md:gap-10 gap-5 m-5">
              <legend className="text-slate-600">
                වර්ෂයක් තුළ ලබාගත් නිවාඩු
              </legend>
              <FloatingLabel
                variant="filled"
                label="වර්ෂය"
                name="year"
                value={data.year}
                onChange={handleChange}
              />
              <FloatingLabel
                variant="filled"
                label="අනියම් නිවාඩු"
                name="casualLeave"
                value={data.casualLeave}
                onChange={handleChange}
              />
              <FloatingLabel
                variant="filled"
                label="විවේක නිවාඩු"
                name="vacationLeave"
                value={data.vacationLeave}
                onChange={handleChange}
              />

              <Button className="uppercase" type="submit">
                {" "}
                <HiOutlineSave className="mr-2 h-5 w-5" />
                Add
              </Button>
              <Button className="uppercase" color="purple" onClick={updateData}>
                {" "}
                <FaSyncAlt className="mr-2 h-5 w-5" />
                Update
              </Button>
              <Button
                className="uppercase"
                color="failure"
                onClick={deleteData}
              >
                {" "}
                <MdDelete className="mr-2 h-5 w-5" />
                Delete
              </Button>
              <Button
                className="uppercase bg-slate-600"
                onClick={() => {
                  resetData();
                }}
              >
                {" "}
                <FaEraser className="mr-2 h-5 w-5" />
                Clear
              </Button>
            </fieldset>
          </form>
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>වර්ෂය</Table.HeadCell>
              <Table.HeadCell>අනියම් නිවාඩු</Table.HeadCell>
              <Table.HeadCell>විවේක නිවාඩු</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {leaveData &&
                leaveData.map((leave) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer text-center"
                      key={leave[0]}
                      onClick={() => handleClick(leave[0], leave[1], leave[2])}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {leave[0]}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {leave[1]}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {leave[2]}
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
            
              PastRecordService.remove(employeeNicNo, data.year)
                .then(( ) => {
                  setShow(false);
                  setMessage(
                    data.year + " වර්ෂයට අදාල නිවාඩු පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී "
                  );
                  setTitle("Success");
                  setOpenModal(true);
                  resetData();
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

export default HRLeaveAddPastRecords;

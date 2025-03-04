import { useState, useEffect } from "react";
import HRCollapseBar from "../components/hr-collapse-bar";
import subjectService from "../services/add-subject-service";
import sectionService from "../services/add-section-service";

import { FloatingLabel, Table, Button, Modal, Select } from "flowbite-react";

import { HiOutlineSave, HiDocumentDuplicate } from "react-icons/hi";
import { FaSyncAlt, FaSearchMinus, FaEraser } from "react-icons/fa";
import {
  MdDelete,
  MdError,
  MdDoneOutline,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import userRoles from "../../data/user-roles";

function HRAddSubjects() {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [sections, setSections] = useState([]);

  const fetchAllData = () => {
    subjectService
      .getAllSubjects()
      .then((response) => {
        setSubjectData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    sectionService
      .getAllSections()
      .then((response) => {
        setSections(response.data);
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

  useEffect(() => {
    if (sectionId) {
      subjectService
        .getSubjectBySectionId(sectionId)
        .then((response) => {
          setSubjectData(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [sectionId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (subjectId === "") {
      setMessage("විෂය අංකය ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (sectionId === "") {
      setMessage("අංශය ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else if (subjectName === "") {
      setMessage("විෂය නම ඇතුලත් කිරීම අනිවාර්යයයි.");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      var data = {
        subjectId: subjectId,
        sectionId: sectionId,
        subjectName: subjectName,
      };
      subjectService
        .getSubject(subjectId)
        .then((response) => {
          setMessage(
            response.data.subjectName + " \n දැනටමත් පද්ධතියට ඇතුලත් කර ඇත"
          );
          setTitle("Duplicate");
          setOpenModal(true);
          setSubjectName("");
          setSubjectId("");
          setSectionId("");
        })
        .catch(() => {
          subjectService
            .addSubject(data)
            .then((response) => {
              setMessage(
                response.data.subjectName + " පද්ධතියට සාර්ථකව ඇතුලත් කරන ලදී"
              );
              setTitle("Success");
              setOpenModal(true);

              fetchAllData();
              setSubjectName("");
              setSubjectId("");
              setSectionId("");
            })
            .catch((error) => {
              setMessage(error.response.data.error);
              setTitle("Error");
              setOpenModal(true);
            });
        });
    }
  };

  const updateData = () => {
    if (subjectName && subjectId && sectionId) {
      subjectService
        .getSubject(subjectId)
        .then(() => {
          var data = {
            subjectId: subjectId,
            sectionId: sectionId,
            subjectName: subjectName,
          };
          subjectService
            .updateSubject(data, subjectId)
            .then((response) => {
              setMessage(
                response.data.subjectName + " සාර්ථකව යාවත්කාලීන කරන ලදී"
              );
              setTitle("Success");
              setOpenModal(true);
              fetchAllData();
              setSubjectName("");
              setSectionId("");
              setSubjectId("");
            })
            .catch((error) => {
              setMessage(error.response.data.error);
              setTitle("Error");
              setOpenModal(true);
            });
        })
        .catch(() => {
          setMessage(subjectName + " \n  පද්ධතියට ඇතුලත් කර නොමැත");
          setTitle("Not Found");
          setOpenModal(true);
        });
    } else {
      setMessage("කරුණාකර පළමුව අදාල විෂය තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const deleteData = () => {
    if (subjectId && sectionId && subjectName) {
      setMessage("ඔබට " + subjectName + " පද්ධතියෙන් ඉවත් කිරීමට අවශ්‍යද ?");
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("කරුණාකර පළමුව අදාල විෂය තෝරන්න");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const handleClick = (subjectName, subjectId, sectionId) => {
    setSubjectName(subjectName);
    setSubjectId(subjectId);
    setSectionId(sectionId);
  };

  return (
    <main>
      <HRCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Change Subjects
        </h3>

        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          {currentUser.includes(roles.hrAdmin) && (<form onSubmit={handleSubmit}>
            <fieldset className="border rounded-lg grid lg:grid-cols-7 p-5 md:gap-10 gap-5 m-5">
           
              {/* <FloatingLabel
                variant="filled"
                label="විෂය අංකය"
                value={subjectId}
                disabled
                className="w-24 cursor-not-allowed"
              /> */}
              <FloatingLabel
                variant="filled"
                label="විෂය අංකය"
                // className="w-96"
                value={subjectId}
                onChange={(event) => {
                  setSubjectId(event.target.value);
                }}
              />
              <FloatingLabel
                variant="filled"
                label="විෂය රාජකාරි"
                value={subjectName}
                onChange={(event) => {
                  setSubjectName(event.target.value);
                }}
              />

              <Select
                id="section"
                value={sectionId}
                name="section"
                onChange={(event) => setSectionId(event.target.value)}
              >
                <option value="">-----අංශය-----</option>
                {sections.map((section) => {
                  return (
                    <option value={section.sectionId} key={section.sectionId}>
                      {section.sectionName}
                    </option>
                  );
                })}
              </Select>

              <Button className="uppercase h-12" type="submit">
                {" "}
                <HiOutlineSave className="mr-2 h-5 w-5" />
                Add Subject
              </Button>
              <Button className="uppercase h-12" color="purple" onClick={updateData}>
                {" "}
                <FaSyncAlt className="mr-2 h-5 w-5" />
                Update Subject
              </Button>
              <Button
                className="uppercase h-12"
                color="failure"
                onClick={deleteData}
              >
                {" "}
                <MdDelete className="mr-2 h-5 w-5" />
                Delete Subject
              </Button>
              <Button
                  className="uppercase bg-slate-600 h-12"
                  
                  onClick={() => {
                    setSectionId("");
                    setSubjectId("");
                    setSubjectName("");
                  }}
                >
                  {" "}
                  <FaEraser className="mr-2 h-5 w-5" />
                  Clear Subject
                </Button>
            </fieldset>
          </form>)}
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>විෂය අංකය</Table.HeadCell>
              <Table.HeadCell>විෂය රාජකාරි</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {subjectData &&
                subjectData.map((subject) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={subject.subjectId}
                      onClick={() =>
                        handleClick(
                          subject.subjectName,
                          subject.subjectId,
                          subject.sectionId
                        )
                      }
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {subject.subjectId}
                      </Table.Cell>
                      <Table.Cell
                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                        key={subject.subjectId}
                      >
                        {subject.subjectName}
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
          {title === "Not Found" && (
            <FaSearchMinus className="inline-block text-yellow-500 text-4xl mr-5" />
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
              subjectService
                .getSubject(subjectId)
                .then(() => {
                  subjectService
                    .removeSubject(subjectId)
                    .then(() => {
                      setShow(false);
                      setMessage(
                        subjectName + " පද්ධතියෙන් සාර්ථකව ඉවත් කරන ලදී "
                      );
                      setTitle("Success");
                      fetchAllData();
                      setOpenModal(true);
                      setSubjectName("");
                      setSubjectId("");
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                })
                .catch(() => {
                  setMessage(subjectId + " \n  පද්ධතියට ඇතුලත් කර නොමැත");
                  setSubjectId("");
                  setSectionId("");
                  setSubjectName("");
                  setTitle("Not Found");
                  setOpenModal(true);
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

export default HRAddSubjects;

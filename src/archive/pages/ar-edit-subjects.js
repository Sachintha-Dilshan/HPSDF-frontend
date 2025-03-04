import { useState, useEffect } from "react";
import ARFileCollapseBar from "../components/ar-file-collapse-bar";
import sectionService from "../services/add-section-service";
import subjectService from "../services/add-subject-service";

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

function AREditSubjects() {
  

  //const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const getSections = async () => {
    try {
      const response = await sectionService.getAllSections();
      setSections(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };
  const getAllSubjects = async () => {
    try {
      setSubjects([]);
      const response = await subjectService.getAllSubject();
      setSubjects(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    const getSubjects = async () => {
      try {
        setSubjects([]);
        const response = await subjectService.getSubjectsBySectionId(sectionId);
        setSubjects(response.data);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        }
      }
    };

    sectionId === "" && getAllSubjects();
    sectionId && getSubjects();
  }, [sectionId]);

  useEffect(() => {
    getSections();
    getAllSubjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sectionId === "") {
      setMessage("Please enter the section ID");
      setTitle("Empty");
      setOpenModal(true);
    } else if (subjectName === "") {
      setMessage("Please enter the subject name");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const data = {
          subjectName: subjectName,
          archiveSection: {
            id: sectionId
          }
        };
        const response = await subjectService.saveArchiveSubject(data);
        setMessage(response.data.subjectName + " has been added successfully");
        setTitle("Success");
        setOpenModal(true);
        setSubjectName("");
        setSectionId("");
        setSubjectId("");
        getAllSubjects();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setMessage(error.response.data.error);
          setTitle("Error");
          setOpenModal(true);
        }
      }
    }
  };

  const updateArchiveSubject = async () => {
    if (subjectId === "" || subjectName === "") {
      setMessage("Please first select a subject from the table");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const data = {
          subjectName: subjectName,
          archiveSection: {
            id: sectionId
          }
        };
        const response = await subjectService.updateArchiveSubject(subjectId, data);
        if (response.status === 200) {
          setMessage(
            response.data.subjectName + " has been updated successfully"
          );
          setTitle("Success");
          setOpenModal(true);
          setSectionId("");
          setSubjectId("");
          setSubjectName("");
          getAllSubjects();
        }
        // Continue with any other logic after a successful response
      } catch (error) {
        if (error.response.status === 404) {
          setMessage(subjectName + " is not found");
          setTitle("Not Found");
          setOpenModal(true);
        } else if (error.response.status === 409) {
          setMessage(error.response.data.error);
          setTitle("Duplicate");
          setOpenModal(true);
        } else if (error.response.status === 500) {
          setMessage(error.response.data.error);
          setTitle("Error");
          setOpenModal(true);
        }
      }
    }
  };
  const deleteArchiveSubject = () => {
    if (subjectId !== "" && subjectName !== "") {
      setMessage("Are you sure you want to delete the subject : " + subjectName);
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("Please first select a subject from the table");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  const handleClick = (subjectId, subjectName, sectionId) => {
    setSubjectName(subjectName);
    setSectionId(sectionId);
    setSubjectId(subjectId);
  };

  return (
    <main>
      <ARFileCollapseBar />
      <div className="flex flex-col  gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Edit Subjects
        </h3>

        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded-lg grid lg:grid-cols-6 p-5 md:gap-10 gap-5 m-5">
              <FloatingLabel
                variant="filled"
                label="SUBJECT NAME"
                value={subjectName}
                onChange={(event) => {
                  setSubjectName(event.target.value);
                }}
              />

              <Select
                id="sectionId"
                value={sectionId}
                name="sectionId"
                onChange={(event) => setSectionId(event.target.value)}
              >
                <option value="">-----SECTION-----</option>
                {sections.map((section) => {
                  return (
                    <option value={section.id} key={section.id}>
                      {section.sectionName}
                    </option>
                  );
                })}
              </Select>

              <Button className="uppercase h-12" type="submit">
                <HiOutlineSave className="mr-2 h-5 w-5" />
                Add Subject
              </Button>
              <Button
                className="uppercase h-12"
                color="purple"
                onClick={updateArchiveSubject}
              >
                {" "}
                <FaSyncAlt className="mr-2 h-5 w-5" />
                Update Subject
              </Button>
              <Button
                className="uppercase h-12"
                color="failure"
                onClick={deleteArchiveSubject}
              >
                {" "}
                <MdDelete className="mr-2 h-5 w-5" />
                Delete Subject
              </Button>
              <Button
                className="uppercase bg-slate-600 h-12"
                onClick={() => {
                  setSectionId("");
                  setSubjectName("");
                }}
              >
                <FaEraser className="mr-2 h-5 w-5" />
                Clear Subject
              </Button>
            </fieldset>
          </form>
        </div>
        <div className="overflow-auto flex justify-center">
          <Table striped hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>Subject Name</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {subjects &&
                subjects.map((subject) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      key={subject.id}
                      onClick={() =>
                        handleClick(subject.id, subject.subjectName, subject.archiveSection.id)
                      }
                    >
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
            onClick={async () => {
              try {
                await subjectService.deleteArchiveSubject(subjectId);
                setMessage(subjectName + " has been deleted successfully");
                setTitle("Success");
                setOpenModal(true);
                setSubjectId("");
                setSubjectName("");
                setSectionId("");
                getAllSubjects();
              } catch (error) {
                if (error.response.status === 404) {
                  setMessage(subjectName + " is not found");
                  setTitle("Not Found");
                  setOpenModal(true);
                } else if (
                  error.response &&
                  error.response.data &&
                  error.response.data.error
                ) {
                  setMessage(error.response.data.error);
                  setTitle("Error");
                  setOpenModal(true);
                }
              }
              setShow(false);
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

export default AREditSubjects;

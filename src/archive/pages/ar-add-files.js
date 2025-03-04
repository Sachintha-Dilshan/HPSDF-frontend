import fileService from "../services/add-file-service";
import sectionService from "../services/add-section-service";
import rackService from "../services/add-rack-service";
import { useState, useEffect } from "react";
import {
  FloatingLabel,
  Select,
  Label,
  Modal,
  Button,
  Spinner,
  Table,
} from "flowbite-react";
import { HiOutlineSave, HiDocumentDuplicate } from "react-icons/hi";
import { FaSearch, FaSyncAlt, FaEraser, FaSearchMinus } from "react-icons/fa";

import {
  MdDelete,
  MdDoneOutline,
  MdRadioButtonUnchecked,
  MdError,
} from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import subjectService from "../services/add-subject-service";
import CollapseBar from "../components/ar-file-collapse-bar";

const FileCrud = (props) => {
  const [sections, setSections] = useState([]);
  const [racks, setRacks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);
  const [isUpdatable, setIsUpdatable] = useState(false);
  const [fileId, setFileId] = useState("");

  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const [fileData, setFileData] = useState({
    fileNumber: "",
    fileName: "",
    archiveSection: "",
    archiveSubject: "",
    year: "",
    rack: "",
    boxNumber: "",
    fileIndex: "",
  });

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

  const getRacks = async () => {
    try {
      const response = await rackService.getAllRacks();
      setRacks(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  const getRecentFiles = async () => {
    try {
      const response = await fileService.getAllFiles();
      setRecentFiles(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    const getRecentFiles = async () => {
      try {
        const response = await fileService.getAllFiles();
        setRecentFiles(response.data);
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

    getRecentFiles();
  }, []);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        setSubjects([]);
        const response = await subjectService.getSubjectsBySectionId(
          fileData.archiveSection
        );
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

   fileData.archiveSection &&  getSubjects();
  }, [fileData.archiveSection]);

  useEffect(() => {
    getSections();
    getRacks();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFileData((prevFileData) => {
      return {
        ...prevFileData,
        [name]: value,
      };
    });
  };

  const searchFile = async (fileId) => {
    if (fileId === "") {
      setMessage("FILE ID IS REQUIRED");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const response = await fileService.getFileById(fileId);

        if (response.status === 200) {
          const file = {
            fileNumber: response.data.fileNumber,
            fileName: response.data.fileName,
            archiveSection: response.data.archiveSection.id,
            archiveSubject: response.data.archiveSubject.id,
            year: response.data.year,
            rack: response.data.rack.id,
            boxNumber: response.data.boxNumber,
            fileIndex: response.data.fileIndex,
          };
          setFileData(file);
          setIsUpdatable(true);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setMessage("File No : " + fileId + " is not found");
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
    }
  };

  const addFile = async () => {
    if (fileData.fileName === "") {
      setMessage("FILE NAME IS REQUIRED");
      setTitle("Empty");
      setOpenModal(true);
    } else if (fileData.archiveSubject === "") {
      setMessage("SUBJECT IS NOT SELECTED");
      setTitle("Empty");
      setOpenModal(true);
    } else if (fileData.archiveSection === "") {
      setMessage("SECTION IS NOT SELECTED");
      setTitle("Empty");
      setOpenModal(true);
    } else if (fileData.year === "") {
      setMessage("YEAR IS REQUIRED");
      setTitle("Empty");
      setOpenModal(true);
    } else if (fileData.rack === "") {
      setMessage("RACK NUMBER IS NOT SELECTED");
      setTitle("Empty");
      setOpenModal(true);
    } else if (fileData.boxNumber === "") {
      setMessage("BOX NUMBER IS REQUIRED");
      setTitle("Empty");
      setOpenModal(true);
    } else if (fileData.fileIndex === "") {
      setMessage("FILE INDEX IS EMPTY.");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const request = {
          fileNumber: fileData.fileNumber,
          fileName: fileData.fileName,
          archiveSection: {
            id: fileData.archiveSection,
          },
          archiveSubject: {
            id: fileData.archiveSubject,
          },
          year: fileData.year,
          rack: {
            id: fileData.rack,
          },
          boxNumber: fileData.boxNumber,
          fileIndex: fileData.fileIndex,
          isChekedOut: false,
        };
        const response = await fileService.addFile(request);
        setMessage("File No : "+ response.data.id +" has been added successfully");
        setTitle("Success");
        setOpenModal(true);
        resetFileData();
        getRecentFiles();
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

    //fetchRecentFilesData();
  };

  const updateFile = async () => {
    if (fileId === "") {
      setMessage("File id is required");
      setTitle("Empty");
      setOpenModal(true);
    } else {
      try {
        const request = {
          fileNumber: fileData.fileNumber,
          fileName: fileData.fileName,
          archiveSection: {
            id: fileData.archiveSection,
          },
          archiveSubject: {
            id: fileData.archiveSubject,
          },
          year: fileData.year,
          rack: {
            id: fileData.rack,
          },
          boxNumber: fileData.boxNumber,
          fileIndex: fileData.fileIndex,
          isChekedOut: false,
        };
        const response = await fileService.updateFile(fileId, request);
        if (response.status === 200) {
          setMessage(
            "File No : " + response.data.id + " has been updated successfully"
          );
          setTitle("Success");
          setOpenModal(true);
          setIsUpdatable(false);
          resetFileData();
        }
        // Continue with any other logic after a successful response
      } catch (error) {
        if (error.response.status === 404) {
          setMessage("File No : " + fileId + " is not found");
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
      getRecentFiles();
    }
  };

  const deleteFile = () => {
    if (fileId !== "") {
      setMessage("Are you sure you want to delete file no : " + fileId);
      setTitle("Warning");
      setShow(true);
      setOpenModal(true);
    } else {
      setMessage("File No is required");
      setTitle("Empty");
      setOpenModal(true);
    }
  };

  // const deleteButton = async () => {
  //   if (file.fileId === "") {
  //     setMessage("File Id is Required");
  //     setTitle("Empty");
  //     setOpenModal(true);
  //   } else {
  //     try {
  //       const response = await fileService.removeFile(id, file.fileId);
  //       if (response.status === 200) {
  //         setMessage(response.data);
  //         setTitle("Success");
  //         setOpenModal(true);
  //       }

  //       //console.log(response.data);
  //     } catch (error) {
  //       if (error.response.status === 404) {
  //         setMessage(error.response.data);
  //         setTitle("Not Found");
  //         setOpenModal(true);
  //         console.log("Error Deleting file:" + error.response.data);
  //       }
  //       //console.error('Error Deleting file:', error);
  //     }
  //     fetchRecentFilesData();
  //   }
  // };

  function resetFileData() {
    setFileData({
      fileNumber: "",
      fileName: "",
      archiveSection: "",
      archiveSubject: "",
      year: "",
      rack: "",
      boxNumber: "",
      fileIndex: "",
    });
    setFileId("");
  }

  const rackJSX =
    racks &&
    racks.map((rack) => (
      <option key={rack.id} value={rack.id}>
        {rack.rackNumber}
      </option>
    ));

  const subjectsJSX =
    subjects &&
    subjects.map((subject) => (
      <option key={subject.id} value={subject.id}>
        {subject.subjectName}
      </option>
    ));

  const sectionsJSX =
    sections &&
    sections.map((section) => (
      <option key={section.id} value={section.id}>
        {section.sectionName}
      </option>
    ));

  return (
    <main>
      <CollapseBar />
      <div className="flex flex-col  gap-2 ml-5 mr-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Add New File
        </h3>

        <fieldset className="border rounded-lg flex items-center justify-center lg:flex-row  flex-col p-5 md:gap-10 gap-5 m-5">
          <FloatingLabel
            className="row-span-full md:row-span-full"
            variant="filled"
            name="fileId"
            label="FILE ID"
            value={fileId}
            onChange={(event) => setFileId(event.target.value)}
          />

          <Button
            className="uppercase w-52"
            color="blue"
            onClick={() => {
              searchFile(fileId);
            }}
          >
            {" "}
            <FaSearch className="mr-2 h-5 w-5" />
            Search File
            {/* Search File */}
          </Button>

          <Button className="uppercase w-52" onClick={addFile}>
            {" "}
            <HiOutlineSave className="mr-2 h-5 w-5" />
            Add File {/* adddbutton-------------------- */}
          </Button>
          <Button
            className="uppercase w-52"
            color="purple"
            onClick={updateFile}
            disabled={!isUpdatable}
          >
            {" "}
            <FaSyncAlt className="mr-2 h-5 w-5" />
            Update File {/*Updatebutton-------------------- */}
          </Button>
          <Button
            className="uppercase w-52"
            color="failure"
            onClick={deleteFile}
          >
            {" "}
            <MdDelete className="mr-2 h-5 w-5" />
            Delete File {/*Deletebutton-------------------- */}
          </Button>
          <Button
            className="uppercase w-52 bg-slate-600"
            onClick={resetFileData}
          >
            {" "}
            <FaEraser className="mr-2 h-5 w-5" /> Clear File{" "}
            {/*Clearbutton-------------------- */}
          </Button>
        </fieldset>

        {/* file details are start from here */}
        <div style={{ fontFamily: "Noto Sans Sinhala" }}>
          <fieldset className="border rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end p-5 gap-5 m-5">
            <legend className="text-slate-600 uppercase">{"Test"}</legend>
            {/* Section Name ..................................*/}
            <FloatingLabel
              variant="filled"
              label="FILE NUMBER"
              name="fileNumber"
              value={fileData.fileNumber}
              onChange={handleChange}
            />
            <FloatingLabel
              variant="filled"
              label="FILE NAME"
              name="fileName"
              value={fileData.fileName}
              onChange={handleChange}
            />

            <FloatingLabel
              variant="filled"
              label="YEAR"
              name="year"
              value={fileData.year}
              onChange={handleChange}
            />

            <div className="mb-2">
              <Label
                htmlFor="archiveSection"
                className="m-1 mb-2 text-slate-500 text-center text-base uppercase"
              >
                Section
              </Label>
              <Select
                id="archiveSection"
                name="archiveSection"
                value={fileData.archiveSection}
                onChange={handleChange}
              >
                <option value="">-----SELECT A SECTION-----</option>
                {sectionsJSX}
              </Select>
            </div>

            <div className="mb-2">
              <Label
                htmlFor="archiveSubject"
                className="m-1 mb-2 text-slate-500 text-center text-base uppercase"
              >
                Subject
              </Label>
              <Select
                id="archiveSubject"
                name="archiveSubject"
                value={fileData.archiveSubject}
                onChange={handleChange}
              >
                <option value="">-----SELECT A SUBJECT-----</option>
                {subjectsJSX}
              </Select>
            </div>

            <fieldset className="border rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end p-5 gap-5 m-5 col-span-full">
              <legend className="text-slate-600 uppercase">location</legend>
              <div className="mb-2 ">
                <Label
                  htmlFor="rack"
                  className="m-1 mb-2 text-slate-500 text-center text-base uppercase"
                >
                  Rack Number
                </Label>
                <Select
                  id="rack"
                  name="rack"
                  value={fileData.rack}
                  onChange={handleChange}
                >
                  <option value="">-----SELECT A RACK NUMBER-----</option>
                  {rackJSX}
                </Select>
              </div>
              <FloatingLabel
                variant="filled"
                label="BOX NUMBER"
                name="boxNumber"
                value={fileData.boxNumber}
                onChange={handleChange}
              />
              <FloatingLabel
                variant="filled"
                label="FILE INDEX"
                name="fileIndex"
                value={fileData.fileIndex}
                onChange={handleChange}
              />
            </fieldset>
          </fieldset>
        </div>
        {/* Table starts here */}
        <div className="overflow-auto">
          <Table striped hoverable >
            <Table.Head>
              <Table.HeadCell>File ID</Table.HeadCell>
              <Table.HeadCell>File Number</Table.HeadCell>
              <Table.HeadCell>File Name</Table.HeadCell>
              <Table.HeadCell>Section</Table.HeadCell>
              <Table.HeadCell>Subject</Table.HeadCell>
              <Table.HeadCell>Year</Table.HeadCell>
              <Table.HeadCell>Rack Number</Table.HeadCell>
              <Table.HeadCell>Box Number</Table.HeadCell>
              <Table.HeadCell>File Index</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {recentFiles &&
                recentFiles.map((file) => (
                  <Table.Row
                    key={file.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      searchFile(file.id);
                      setFileId(file.id);
                    }}
                  >
                    <Table.Cell>{file.id}</Table.Cell>
                    <Table.Cell>{file.fileNumber}</Table.Cell>
                    <Table.Cell>{file.fileName}</Table.Cell>
                    <Table.Cell>{file.archiveSection.sectionName}</Table.Cell>
                    <Table.Cell>{file.archiveSubject.subjectName}</Table.Cell>
                    <Table.Cell>{file.year}</Table.Cell>
                    <Table.Cell>{file.rack.rackNumber}</Table.Cell>
                    <Table.Cell>{file.boxNumber}</Table.Cell>
                    <Table.Cell>{file.fileIndex}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>

        {/* Table ends here */}
        {/* Personlan details ends here */}
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            {title === "Processing" && <Spinner size="xl" />}
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
            <div className="normal-case text-center">{message}</div>
          </Modal.Body>
          <Modal.Footer className="flex justify-center">
            <Button onClick={() => setOpenModal(false)}>Close</Button>
            <Button
              onClick={async () => {
                try {
                  const response = await fileService.deleteFile(fileId);
                  setMessage(response.data);
                  setTitle("Success");
                  setOpenModal(true);
                  getRecentFiles();
                  resetFileData();
                } catch (error) {
                  if (error.response.status === 404) {
                    setMessage("File No : " + fileId + " is not found");
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
      </div>
    </main>
  );
};

export default FileCrud;

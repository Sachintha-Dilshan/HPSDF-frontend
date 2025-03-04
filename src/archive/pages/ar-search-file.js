import { Button, FloatingLabel, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import fileService from "../services/add-file-service";
import sectionService from "../services/add-section-service";
import subjectService from "../services/add-subject-service";
import { AiOutlineClear } from "react-icons/ai";
// import { BiSearch } from "react-icons/bi";
import ARFileCollapseBar from "../components/ar-file-collapse-bar";
import ARSearchFileTable from "../components/ar-search-file-table";

function ARSearchFile() {
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState({
    fileNumber: "",
    fileName: "",
    year: "",
    archiveSection: "",
    archiveSubject: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFileData((prevFileData) => {
      return {
        ...prevFileData,
        [name]: value,
      };
    });
  };
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

    fileData.archiveSection && getSubjects();
  }, [fileData.archiveSection]);

  useEffect(() => {
    getSections();
  }, []);

  useEffect(() => {
    const searchFiles = async () => {
      try {
        const response = await fileService.searchFiles(fileData);
        setFiles(response.data);
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
    searchFiles();
  }, [fileData]);

  const clearData = () => {
    setFileData({
      fileNumber: "",
      fileName: "",
      year: "",
      archiveSection: "",
      archiveSubject: "",
    });
  };

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
      <ARFileCollapseBar />
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          SEARCH FILE
        </h3>
      </div>

      <fieldset className="border rounded-lg grid lg:grid-cols-6  p-5 gap-5 m-5">
        <FloatingLabel
          variant="filled"
          label="File Number"
          name="fileNumber"
          value={fileData.fileNumber}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="filled"
          label="File Name"
          name="fileName"
          value={fileData.fileName}
          onChange={handleChange}
        />
        <FloatingLabel
          variant="filled"
          label="Year"
          name="year"
          value={fileData.year}
          onChange={handleChange}
        />

        {/*select section */}
        <div>
          <Select
            id="archiveSection"
            name="archiveSection"
            value={fileData.archiveSection}
            onChange={handleChange}
            required
          >
            <option value="">-----SECTION-----</option>
            {sectionsJSX}
          </Select>
        </div>

        {/*Select Subject */}
        <div>
          <Select
            id="archiveSubject"
            name="archiveSubject"
            value={fileData.archiveSubject}
            onChange={handleChange}
            required
            disabled={!fileData.archiveSection}
          >
            <option value="">-----SUBJECT-----</option>
            {subjectsJSX}
          </Select>
        </div>
        {/*Search files button*/}
        {/* <Button className="uppercase h-10" color="blue" onClick={searchFiles}>
          <BiSearch className="mr-2 h-5 w-5" />
          Search File
        </Button> */}

        {/*Clear files button*/}
        <Button className="uppercase h-10" color="red" onClick={clearData}>
          <AiOutlineClear className="mr-2 h-5 w-5" />
          Clear File
        </Button>
      </fieldset>

      <div className="mx-5">
        <ARSearchFileTable files={files} />
      </div>
    </main>
  );
}

export default ARSearchFile;

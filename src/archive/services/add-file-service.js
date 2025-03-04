import axios from "axios";
import AuthHeader from "../../services/auth-header";
import BASE_URL from "../../services/base-url";

const API_URL = BASE_URL + "/api/auth/ar/";

const findByFileName = (fileName) => {
  return axios.get(API_URL + `fileByName/${fileName}`, {
    headers: AuthHeader(),
  });
};

const getAllFiles = () => {
  return axios.get(API_URL + "getFiles", { headers: AuthHeader() });
};

const searchFiles = (file) => {
  let url = API_URL + "searchFiles?";
  if (file.fileNumber) url += `&fileNumber=${file.fileNumber}`;
  if (file.fileName) url += `&fileName=${file.fileName}`;
  if (file.year) url += `&year=${file.year}`;
  if (file.archiveSection) url += `&archiveSectionId=${file.archiveSection}`;
  if (file.archiveSubject) url += `&archiveSubjectId=${file.archiveSubject}`;
  return axios.post(url, { headers: AuthHeader() });
};
const getRecentFiles = (sectionId) => {
  return axios.get(API_URL + `recentFiles/${sectionId}`, {
    headers: AuthHeader(),
  });
};

const getFileById = (fileId) => {
  return axios.get(API_URL + `getFileById/${fileId}`, {
    headers: AuthHeader(),
  });
};

const getFileCountBySection = (data) => {
  return axios.post(API_URL + "getFileCountBySection", data, {
    headers: AuthHeader(),
  });
};

const getCheckedoutFiles = (file) => {
  let url = API_URL + "checkedOutFiles?";
  if (
    file.fileNumber !== undefined &&
    file.fileNumber !== "" &&
    file.fileNumber !== null
  ) {
    url += `&fileNumber=${file.fileNumber}`;
  }
  if (
    file.fileName !== undefined &&
    file.fileName !== "" &&
    file.fileName !== null
  ) {
    url += `&fileName=${file.fileName}`;
  }
  if (file.year !== undefined && file.year !== "" && file.year !== null) {
    url += `&year=${file.year}`;
  }
  if (
    file.section !== undefined &&
    file.section !== "" &&
    file.section !== null
  ) {
    url += `&sectionName=${file.section}`;
  }
  if (
    file.subject !== undefined &&
    file.subject !== "" &&
    file.subject !== null
  ) {
    url += `&subjectName=${file.subject}`;
  }
  if (
    file.employeeId !== undefined &&
    file.employeeId !== "" &&
    file.employeeId !== null
  ) {
    url += `&employeeNIC=${file.employeeId}`;
  }
  console.log(url);
  return axios.get(url, { headers: AuthHeader() });
};


const getFileCheckedOutCount = () => {
  return axios.get(API_URL + `checkedOutFilesCount`, { headers: AuthHeader() });
};
const addFile = (data) => {
  return axios.post(API_URL + "saveFile", data, { headers: AuthHeader() });
};

const updateFile = (fileId, data) => {
  return axios.put(API_URL + `updateFile/${fileId}`, data, {
    headers: AuthHeader(),
  });
};

const checkOutFile = (fileId, employeeId) => {
  return axios.put(API_URL + `checkOutFile/${fileId}/${employeeId}`, {
    headers: AuthHeader(),
  });
};

const checkInFile = (fileId) => {
  return axios.put(API_URL + `checkInFile/${fileId}`, {
    headers: AuthHeader(),
  });
};

const deleteFile = (fileId) => {
  return axios.delete(API_URL + `deleteFile/${fileId}`, {
    headers: AuthHeader(),
  });
};

const fileService = {
  getAllFiles,
  getRecentFiles,
  getFileById,
  getCheckedoutFiles,
  searchFiles,
  getFileCheckedOutCount,
  getFileCountBySection,
  addFile,
  updateFile,
  checkOutFile,
  checkInFile,
  deleteFile,
  findByFileName,
};

export default fileService;

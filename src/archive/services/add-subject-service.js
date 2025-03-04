import axios from "axios";
import AuthHeader from "../../services/auth-header";
import BASE_URL from "../../services/base-url";

const API_URL = BASE_URL + "/api/auth/ar/";

const getSubjectsBySectionId = (sectionId) => {
  return axios.get(API_URL + `subjectsBySectionId/${sectionId}`, {
    headers: AuthHeader(),
  });
};

const getAllSubject = () => {
  return axios.get(API_URL + "getAllArchiveSubjects" , {
    headers: AuthHeader(),
  });
};

const saveArchiveSubject = (data) => {
  return axios.post(API_URL + "saveArchiveSubject", data, {
    headers: AuthHeader(),
  });
};

const updateArchiveSubject = (id, data) => {
  return axios.put(API_URL + `updateArchiveSubject/${id}`, data, {
    headers: AuthHeader(),
  });
};

const deleteArchiveSubject = id => {
  return axios.delete(API_URL + `deleteArchiveSubject/${id}`, { headers: AuthHeader() });
};

const subjectService = {
  saveArchiveSubject,
  updateArchiveSubject,
  getSubjectsBySectionId,
  getAllSubject,
  deleteArchiveSubject
};

export default subjectService;

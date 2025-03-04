import axios from "axios";
import AuthHeader from "../../../services/auth-header";
import BASE_URL from "../../../services/base-url";

const API_URL = BASE_URL + "/api/auth/hr/leave/";

const getLeaveOfficers = (role) => {
  return axios.get(API_URL + `getLeaveOfficers/${role}`, { headers: AuthHeader() });
};

const getLeaveOfficerByLeaveId = (leaveId) => {
  return axios.get(API_URL + `getLeaveOfficerByLeaveId/${leaveId}`, {
    headers: AuthHeader(),
  });
};

const getLeaveOfficerByNic = (nicNo) => {
  return axios.get(API_URL + `getLeaveOfficerByNic/${nicNo}`, {
    headers: AuthHeader(),
  });
};

const addLeaveOfficer = (data) => {
  return axios.post(API_URL + "addLeaveOfficer", data, { headers: AuthHeader() });
};



const removeLeaveOfficer = (nicNo) => {
  return axios.delete(API_URL + `removeLeaveOfficer/${nicNo}`, { headers: AuthHeader() });
};



const editLeaveOfficerService = {
  getLeaveOfficers,
  getLeaveOfficerByNic,
  getLeaveOfficerByLeaveId,
  addLeaveOfficer,
  removeLeaveOfficer
};

export default editLeaveOfficerService;

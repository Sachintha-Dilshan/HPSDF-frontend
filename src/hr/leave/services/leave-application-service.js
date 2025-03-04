import axios from "axios";
import AuthHeader from "../../../services/auth-header";
import BASE_URL from "../../../services/base-url";

const API_URL = BASE_URL + "/api/auth/hr/leave/";

const saveLeaveApplication = (data) => {
  return axios.post(API_URL + "saveLeaveApplication", data, {
    headers: AuthHeader(),
  });
};

const getLeaveChit = (applicationId) => {
  return axios.get(API_URL + `getLeaveChit/${applicationId}`, {
    headers: AuthHeader(),
  });
};

const getApprovedLeaveApplications = (nicNo) => {
  return axios.get(API_URL + `getApprovedLeaveApplications/${nicNo}`, {
    headers: AuthHeader(),
  });
};

const getOnLeaveTodayApplications = () => {
  return axios.get(API_URL + "getOnLeaveTodayApplications", {
    headers: AuthHeader(),
  });
};


const getOnLeaveTodayApplicationsCount = () => {
  return axios.get(API_URL + "getOnLeaveTodayApplicationsCount", {
    headers: AuthHeader(),
  });
};

const getLeaveRequests = (nicNo) => {
  return axios.get(API_URL + `getLeaveRequests/${nicNo}`, {
    headers: AuthHeader(),
  });
};


const getLeaveRequestsCount = (nicNo) => {
  return axios.get(API_URL + `getLeaveRequestsCount/${nicNo}`, {
    headers: AuthHeader(),
  });
};

const updateApplicationStatus = (data, applicationId) => {
  return axios.put(API_URL + `updateApplicationStatus/${applicationId}`, data, {
    headers: AuthHeader(),
  });
};

const LeaveApplicationService = {
  saveLeaveApplication,
  getLeaveChit,
  getApprovedLeaveApplications,
  getOnLeaveTodayApplications,
  getOnLeaveTodayApplicationsCount,
  getLeaveRequests,
  getLeaveRequestsCount,
  updateApplicationStatus
};

export default LeaveApplicationService;
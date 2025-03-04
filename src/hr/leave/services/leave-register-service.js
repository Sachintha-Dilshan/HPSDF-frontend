import axios from "axios";
import AuthHeader from "../../../services/auth-header";
import BASE_URL from "../../../services/base-url";

const API_URL = BASE_URL + "/api/auth/hr/leave/";

const saveLeaveRegister = (data) => {
  return axios.post(API_URL + "saveLeaveRegister", data, {
    headers: AuthHeader(),
  });
};

const getLeaveRegister = (nicNo) => {
  return axios.get(API_URL + `leaveRegisterByNic/${nicNo}`, {
    headers: AuthHeader(),
  });
};

const getAllLeaveRegisters = () => {
  return axios.get(API_URL + "getAllLeaveRegisters", {
    headers: AuthHeader(),
  });
};
const LeaveRegisterService = {
  saveLeaveRegister,
  getLeaveRegister,
  getAllLeaveRegisters
};

export default LeaveRegisterService;
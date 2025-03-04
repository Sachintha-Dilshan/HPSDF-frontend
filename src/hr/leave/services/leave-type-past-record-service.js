import axios from "axios";
import AuthHeader from "../../../services/auth-header";
import BASE_URL from "../../../services/base-url";

const API_URL = BASE_URL + "/api/auth/hr/leave/";

const getAll = () => {
  return axios.get(API_URL + "getAllPastRecords", { headers: AuthHeader() });
};

const getByNicNo = (nicNo) => {
  return axios.get(API_URL + `getPastRecordByNicNo/${nicNo}`, {
    headers: AuthHeader(),
  });
};

const add = (data) => {
  return axios.post(API_URL + "addPastRecord", data, { headers: AuthHeader() });
};

const update = (data) => {
  return axios.put(API_URL + "updatePastRecord", data, {
    headers: AuthHeader(),
  });
};

const remove = (nicNo, year) => {
  return axios.delete(API_URL + `deletePastRecord/${nicNo}/${year}`, {
    headers: AuthHeader(),
  });
};

const PastRecordService = {
  getAll,
  getByNicNo,
  add,
  update,
  remove
};

export default PastRecordService;

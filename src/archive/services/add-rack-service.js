import axios from "axios";
import AuthHeader from "../../services/auth-header";
import BASE_URL from "../../services/base-url";

const API_URL = BASE_URL + "/api/auth/ar/";

const addRacks = (data) => {
  return axios.post(API_URL + "saveRack", data, { headers: AuthHeader() });
};

const getAllRacks = () => {
  return axios.get(API_URL + "getAllRacks", { headers: AuthHeader() });
};

const updateRacks = (id, data) => {
  return axios.put(API_URL + `updateRack/${id}`, data, {
    headers: AuthHeader(),
  });
};

const deleteRacks = id => {
  return axios.delete(API_URL + `deleteRack/${id}`, { headers: AuthHeader() });
};

const rackService = {
  addRacks,
  updateRacks,
  getAllRacks,
  deleteRacks
};

export default rackService;

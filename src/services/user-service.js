import axios from "axios";
import AuthHeader from "./auth-header";
import BASE_URL from "./base-url";

const API_URL = BASE_URL + "/api/auth/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: AuthHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: AuthHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: AuthHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;

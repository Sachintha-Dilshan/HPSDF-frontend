import axios from "axios";
import AuthHeader from "../../services/auth-header";
import BASE_URL from "../../services/base-url";

const API_URL = BASE_URL + "/api/auth/ar/";


const saveTransaction = (data) => {
  return axios.post(API_URL + "saveFileTransaction", data, {
    headers: AuthHeader(),
  });
};

const updateFileTransaction = (id, data) => {
  return axios.put(API_URL + `updateFileTransaction/${id}`, data, {
    headers: AuthHeader(),
  });
}

const getFileTransactionsByEmployee = (nicNo) => {
  return axios.get(API_URL + `getFileTransactionsByEmployee/${nicNo}`, {
    headers: AuthHeader(),
  });
};

const getCheckedOutFiles = () => {
  return axios.get(API_URL + "getCheckedOutFiles", {
    headers: AuthHeader(),
  });
}
const archiveTransactionService = {
    saveTransaction,
    updateFileTransaction,
    getFileTransactionsByEmployee,
    getCheckedOutFiles
  };
  
  export default archiveTransactionService;
import axios from "axios";
import AuthHeader from "../../services/auth-header";
import BASE_URL from "../../services/base-url";

const API_URL = BASE_URL + "/api/auth/hr/";

const getAllSections = () => {
    return axios.get(API_URL + "section", { headers: AuthHeader() });
  };
  
  const getSection = id => {
    return axios.get(API_URL + `sectionById/${id}`, { headers: AuthHeader() });
    
  };
  
  const addSection = data => {
    return axios.post(API_URL + "section", data, { headers: AuthHeader() } );
  };
  
  const updateSection = (data,id) => {
    return axios.put(API_URL + `section/${id}`, data, { headers: AuthHeader() } );
  };
  
  const removeSection = id => {
    return axios.delete(API_URL + `section/${id}`, { headers: AuthHeader() });
  };
    

  const findBySectionName = sectionName => {
    return axios.get(API_URL + `sectionByName/${sectionName}`, { headers: AuthHeader() });
  };
  
  const sectionService = {
    getAllSections,
    getSection,
    addSection,
    updateSection,
    removeSection,
    findBySectionName
  };
  
  export default sectionService;

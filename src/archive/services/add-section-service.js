import axios from "axios";
import AuthHeader from "../../services/auth-header";
import BASE_URL from "../../services/base-url";

const API_URL = BASE_URL + "/api/auth/ar/";


const getAllSections = () => {
    return axios.get(API_URL + "getAllArchiveSections", { headers: AuthHeader() });
  };
  
  const getSectionById = id => {
    return axios.get(API_URL + `sectionById/${id}`, { headers: AuthHeader() });
  };
  
  // const addSection = data => {
  //   return axios.post(API_URL + "file", data, { headers: AuthHeader() } );
  // };
  
  // const updateSecion = (data,id) => {
  //   return axios.put(API_URL + `file/${id}`, data, { headers: AuthHeader() } );
  // };
  
  // const removeSection = id => {
  //   return axios.delete(API_URL + `file/${id}`, { headers: AuthHeader() });
  // };
    

  
  
  const sectionService = {
    getAllSections,
    getSectionById
   
  };
  
  export default sectionService;
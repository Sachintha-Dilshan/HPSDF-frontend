import axios from "axios";
import AuthHeader from "../../services/auth-header";
import BASE_URL from "../../services/base-url";

const API_URL = BASE_URL + "/api/auth/hr/";

const getAllServiceSectors = () => {
    return axios.get(API_URL + "serviceSector", { headers: AuthHeader() });
  };
  
  const getServiceSector = id => {
    return axios.get(API_URL + `serviceSectorById/${id}`, { headers: AuthHeader() });
    
  };
  
  const addServiceSector = data => {
    return axios.post(API_URL + "serviceSector", data, { headers: AuthHeader() } );
  };
  
  const updateServiceSector = (data,id) => {
    return axios.put(API_URL + `serviceSector/${id}`, data, { headers: AuthHeader() } );
  };
  
  const removeServiceSector = id => {
    return axios.delete(API_URL + `serviceSector/${id}`, { headers: AuthHeader() });
  };
    

  const findByServiceSectorName = serviceSectorName => {
    return axios.get(API_URL + `serviceSectorByName/${serviceSectorName}`, { headers: AuthHeader() });
  };
  
  const serviceSectorService = {
    getAllServiceSectors,
    getServiceSector,
    addServiceSector,
    updateServiceSector,
    removeServiceSector,
    findByServiceSectorName
  };
  
  export default serviceSectorService;

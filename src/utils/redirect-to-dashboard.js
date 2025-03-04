import { Navigate } from "react-router-dom";
import userRoles from "../data/user-roles";

const RedirectToDashboard = () => {
  // Assuming you store the user's information in localStorage or similar
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  // Determine which dashboard to redirect to based on the user's roles
  if (currentUser.includes(roles.hrAdmin)) {
    return <Navigate to="/HR/dashboard" />;
  } else if (currentUser.includes(roles.leaveAdmin)) {
    return <Navigate to="/HR/Leave/dashboard" />;
  } else if (currentUser.includes(roles.archivist)) {
    return <Navigate to="/AR/archiveDashboard" />;
  } else {
    // Redirect to a default page or display an error/not found page
    return <Navigate to="/" />;
  }
};

export default RedirectToDashboard;

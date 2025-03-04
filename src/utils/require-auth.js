import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import { PiProhibitFill } from "react-icons/pi";

const RequireAuth = ({ children, userroles }) => {
  const [openModal, setOpenModal] = useState(false);
  let currentUserRole;

  if (localStorage.getItem("user")) {
    currentUserRole = JSON.parse(localStorage.getItem("user")).roles;
  }
  
  const location = useLocation();

  useEffect(() => {
    if (!currentUserRole) {
      // Redirecting will be handled by the return statement outside useEffect
    } else if (userroles && !currentUserRole.some((role) => userroles.includes(role))) {
      // Open modal if user doesn't have access
      setOpenModal(true);
    }
  }, [currentUserRole, userroles]);

  if (!currentUserRole) {
    // If there's no user role, redirect to login
    return <Navigate to="/" state={{ from: location.pathname }} />;
  }

  // It's important to note that the modal should be part of the component's return structure
  // to ensure it gets rendered correctly. This means you have to always return the structure of your page,
  // and conditionally render the modal based on the `openModal` state.
  return (
    <>
      {openModal && (
        <Modal show={openModal}>
          <Modal.Header>
            <PiProhibitFill className="inline-block text-red-500 text-4xl mr-5" />
            Prohibited
          </Modal.Header>
          <Modal.Body>
            <div>Access Denied !</div>
          </Modal.Body>
          <Modal.Footer className="flex justify-center">
            <Button onClick={() => {setOpenModal(false); localStorage.removeItem("user")} }>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* This part ensures that the children are rendered if the modal isn't shown, acting as a fallback. */}
      {!openModal && children}
    </>
  );
};
export default RequireAuth;

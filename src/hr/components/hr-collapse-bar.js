import {useState} from "react";
import { Link } from "react-router-dom";
import { IoPeople, IoAddOutline, IoSettingsSharp } from "react-icons/io5";
import userRoles from "../../data/user-roles";

function HRCollapseBar() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;
  return (
    <div
      className=" rounded-tr-3xl rounded-br-3xl items-center px-1 py-10 my-2  w-8  bg-gray-700 transition-all duration-300 ease-in-out hover:w-60 cursor-pointer fixed left-0 top-16 bottom-14 z-50"
      style={{ backgroundColor: "rgba(1, 9, 34, 0.80)" }}
      onMouseEnter={() => setShow((prevShow) => !prevShow)}
      onMouseLeave={() => setShow((prevShow) => !prevShow)}
    >
      <div>
        <i className="fas fa-angle-double-right text-white text-2xl"></i>
      </div>
      <div className="flex flex-col h-full">
        <div style={{ display: show ? "block" : "none" }}>
          <ul className="text-white uppercase">
            {currentUser.includes(roles.hrAdmin) && (
              <li
                className="font-bold my-5"
                onMouseEnter={() => setShowEmployee((prevShow) => !prevShow)}
                onClick={() => setShowEmployee((prevShow) => !prevShow)}
              >
                <IoPeople className="inline-block text-2xl" /> Employee
              </li>
            )}
            {currentUser.includes(roles.hrAdmin) && (
              <ul
                className="ml-5"
                style={{ display: showEmployee ? "block" : "none" }}
              >
                <Link to="/HR/addEmployee">
                  <li className="my-2">
                    <IoAddOutline className="inline-block text-2xl" /> Add New
                  </li>
                </Link>
              </ul>
            )}

            <li
              className="font-bold my-5"
              onMouseEnter={() => setShowSettings((prevShow) => !prevShow)}
              onClick={() => setShowSettings((prevShow) => !prevShow)}
            >
              <IoSettingsSharp className="inline-block text-2xl mr-2" />
              Settings
            </li>
            <ul
              className="ml-5"
              style={{ display: showSettings ? "block" : "none" }}
            >
              <Link to="/HR/addSections">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" />
                  Edit Section
                </li>
              </Link>
              <Link to="/HR/addSubjects">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" />
                  Edit Subject
                </li>
              </Link>
              <Link to="/HR/addDesignations">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" />
                  Edit Designation
                </li>
              </Link>
              <Link to="/HR/addServiceSectors">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" />
                  Edit Service Sector
                </li>
              </Link>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HRCollapseBar;

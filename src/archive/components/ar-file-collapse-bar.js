import { useState } from "react";
import { Link } from "react-router-dom";
import { IoPeople } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoAddOutline, IoSettingsSharp } from "react-icons/io5";
import { AiOutlineFileAdd } from "react-icons/ai";
import userRoles from "../../data/user-roles";

function ARFileCollapseBar() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  return (
    <div
      className=" rounded-tr-3xl rounded-br-3xl items-center px-1 py-10 my-2  w-8  bg-gray-700 transition-all duration-300 ease-in-out hover:w-52 cursor-pointer fixed left-0 top-16 bottom-14 z-50"
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
            {currentUser.includes(roles.archivist) && (
              <Link to="/AR/fileCrud">
                <li className="font-bold my-5">
                  <AiOutlineFileAdd className="inline-block text-2xl mr-2" />
                  Add New File
                </li>
              </Link>
            )}
            <Link to="/AR/searchFiles">
              <li className="font-bold my-5">
                <IoIosSearch className="inline-block text-2xl mr-2" />
                Search File
              </li>
            </Link>
            <Link to="/AR/checkedOutFilesEmployee">
              <li className="font-bold my-5">
                <IoPeople className="inline-block text-2xl mr-2" />
                Employee Profile
              </li>
            </Link>
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
              <Link to="/AR/editSubjects">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl mr-2" />
                  Edit Subjects
                </li>
              </Link>
              <Link to="/AR/editRacks">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl mr-2" />
                  Edit Racks
                </li>
              </Link>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ARFileCollapseBar;

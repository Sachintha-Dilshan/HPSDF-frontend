import {useState} from 'react';
import { Link } from "react-router-dom";
import {IoAddOutline, IoSettingsSharp, IoCalendarSharp } from "react-icons/io5";

function LeaveCollapseBar() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
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
            <li
              className="font-bold my-5"
              onMouseEnter={() => setShowEmployee((prevShow) => !prevShow)}
              onClick={() => setShowEmployee((prevShow) => !prevShow)}
            >
              <IoCalendarSharp className="inline-block text-2xl" /> Leave
            </li>
            <ul className="ml-5" style={{ display: showEmployee ? "block" : "none" }}>
              <Link to="/HR/Leave/applyLeave">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" /> Apply Leave
                </li>
              </Link>
            </ul>

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
              <Link to="/HR/Leave/addLeaves">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" />
                  Edit Leave Types
                </li>
              </Link>
              <Link to="/HR/Leave/addPastRecords">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" />
                  Edit Past Leaves
                </li>
              </Link>
              <Link to="/HR/Leave/editLeaveOfficers">
                <li className="my-2">
                  <IoAddOutline className="inline-block text-2xl" />
                  Edit Leave Officers
                </li>
              </Link>
              
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeaveCollapseBar;

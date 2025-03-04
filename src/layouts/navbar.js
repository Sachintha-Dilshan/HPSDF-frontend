"use client";
import { useState, useEffect } from "react";
import { Avatar, Dropdown, Navbar, NavbarLink } from "flowbite-react";
import { HiLogout, HiViewGrid, HiUserCircle } from "react-icons/hi";
import { FaHome, FaArchive, FaStoreAlt, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import EmployeeService from "../hr/services/add-new-employee-service";
import userRoles from "../data/user-roles";

function NavigationBar() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const userEmail = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).email
    : null;

  useEffect(()=>{
    const getEmployeeData = async () => {
      try {
        const data = {
          email: userEmail,
        };

        const response = await EmployeeService.getEmployeeByEmail(data);
        localStorage.setItem("nicNo", JSON.stringify(response.data[0][0]));
        setEmployeeData(response.data[0]);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        }
      }
      const employeeId = JSON.parse(localStorage.getItem("nicNo"));

      try {
        const response = await EmployeeService.getImage(employeeId);
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        }
      }
    }

    getEmployeeData();
  },[userEmail]);

  return (
    <Navbar
      fluid
      style={{ backgroundColor: "rgba(1, 9, 34, 0.80)" }}
      className="fixed top-0 w-full z-50 shadow"
    >
      <Navbar.Brand href="https://hakmana.ps.gov.lk/">
        <img
          src={process.env.PUBLIC_URL + "/Images/government-logo.png"}
          className="mr-3 h-10"
          alt="Government Logo"
        />
        <img
          src={process.env.PUBLIC_URL + "/Images/sabha-logo.png"}
          className="mr-3 h-10"
          alt="Sabha Logo"
        />
        <span className="self-center  text-center   flex-wrap text-lg font-semibold text-white uppercase ">
          HPSDF
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={process.env.PUBLIC_URL + imageUrl}
              rounded
              className="mx-5"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm font-bold">
              {employeeData && employeeData[1]}
            </span>
            <span className="block truncate text-sm font-medium">
              {employeeData && employeeData[3]}
            </span>
          </Dropdown.Header>{" "}
          <Dropdown.Item
            icon={HiViewGrid}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            {" "}
            Dashboard{" "}
          </Dropdown.Item>
          <Dropdown.Item
            icon={HiUserCircle}
            onClick={() =>
              navigate("HR/employeeProfile", { state: employeeData })
            }
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            icon={HiLogout}
            onClick={() => {
              AuthService.logout();
              navigate("/");
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavbarLink
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer"
          active
        >
          <span className="text-white text-center uppercase md:px-4 md:py-1 md:rounded-full md:border md:border-solid md:border-white md:bg-cyan-800 md:hover:bg-cyan-700  transition ease-in-out duration-300 flex items-center justify-center">
            <FaHome className="text-xl text-white mr-2 inline-block" />
            Home
          </span>
        </NavbarLink>

        <NavbarLink
          onClick={() => navigate("/HR/leave/applyLeave")}
          className="cursor-pointer"
        >
          <span className="text-center hover:text-black md:hover:text-white text-white  uppercase md:px-4 md:py-1 md:rounded-full md:border md:border-solid md:border-white  md:hover:bg-cyan-700  transition ease-in-out duration-300 flex items-center justify-center">
            <FaCalendarCheck className="text-xl text-white mr-2 inline-block" />
            Leaves
          </span>
        </NavbarLink>

        {!currentUser.includes(roles.archivist) && (
          <NavbarLink
            onClick={() => navigate("/AR/archiveDashboard")}
            className="cursor-pointer"
          >
            <span className="text-center w-full hover:text-black md:hover:text-white text-white  uppercase md:px-4 md:py-1 md:rounded-full md:border md:border-solid md:border-white  md:hover:bg-cyan-700  transition ease-in-out duration-300 flex items-center justify-center">
              <FaArchive className="text-lg text-white mr-2 inline-block" />
              Archive
            </span>
          </NavbarLink>
        )}

        <NavbarLink
          onClick={() => navigate("store")}
          className="cursor-pointer"
        >
          <span className="text-center w-full hover:text-black md:hover:text-white text-white  uppercase md:px-4 md:py-1 md:rounded-full md:border md:border-solid md:border-white  md:hover:bg-cyan-700  transition ease-in-out duration-300 flex items-center justify-center">
            <FaStoreAlt className="text-xl text-white mr-2 inline-block" />
            Store
          </span>
        </NavbarLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;

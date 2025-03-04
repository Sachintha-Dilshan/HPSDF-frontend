import { useState, useEffect } from "react";
import HREmployeeCard from "../components/hr-employee-card";
import HRCollapseBar from "../components/hr-collapse-bar";
import { FloatingLabel, Select, Button } from "flowbite-react";
//import employees from "../../Data";
import EmployeeService from "../services/add-new-employee-service";
import sectionService from "../services/add-section-service";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import userRoles from "../../data/user-roles";
import LeaveCollapseBar from "../leave/components/hr-leave-collapse-bar";

function HRSearchEmployees() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).roles
  : null;
const roles = userRoles;

  const [employeeData, setEmployeeData] = useState([]);
  const [sections, setSections] = useState([]);
  const [nicNo, setNicNo] = useState("");
  const [leaveId, setLeaveId] = useState("");
  const [sectionId, setSectionId] = useState("");

  const fetchAllEmployees = () => {
    setEmployeeData([]);
    EmployeeService.getEmployees()
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log(error.response.data.error);
        }
      });
  };


  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await EmployeeService.getEmployees();
        setEmployeeData(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          console.log(error.response.data.error);
        }
      }
    };
  
    fetchAllEmployees();
  }, []);
  
  useEffect(() => {
    const sortEmployeesBySection = async () => {
      if (sectionId) {
        try {
          const response = await EmployeeService.sortEmployeesBySection(sectionId);
          setEmployeeData(response.data);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
          }
        }
      }
    };
  
    sortEmployeesBySection();
  }, [sectionId]);
  
  useEffect(() => {
    const sortEmployeesByNicNo = async () => {
      if (nicNo) {
        try {
          const response = await EmployeeService.sortEmployeesByNicNo(nicNo);
          setEmployeeData(response.data);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
          }
        }
      }
    };
  
    sortEmployeesByNicNo();
  }, [nicNo]);
  
  useEffect(() => {
    const sortEmployeesByLeaveId = async () => {
      if (leaveId) {
        try {
          const response = await EmployeeService.sortEmployeesByLeaveId(leaveId);
          setEmployeeData(response.data);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
          }
        }
      }
    };
  
    sortEmployeesByLeaveId();
  }, [leaveId]);
  
  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        const response = await sectionService.getAllSections();
        setSections(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAllSections();
  }, []);
  

  return (
    <main>
      {/* Collapse bar starts here */}
      {currentUser.some(role => [roles.hrAdmin, roles.chairman, roles.secretary].includes(role)) && <HRCollapseBar />}
      {currentUser.includes(roles.leaveAdmin) && <LeaveCollapseBar />}
      {/* Collapse bae ends here */}

      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase mx-5">
          Search Employee
        </h3>

        {/* Search option starts here */}
        <div className="flex items-center justify-center">
          <fieldset className="grid grid-col-1 lg:grid-cols-4 gap-10 border rounded-lg p-5">
            <FloatingLabel
              variant="filled"
              label="ජාතික හැදුනුම්පත් අංකය"
              value={nicNo}
              onChange={(event) => setNicNo(event.target.value)}
            />
            <FloatingLabel
              variant="filled"
              label="නිවාඩු අංකය"
              value={leaveId}
              onChange={(event) => setLeaveId(event.target.value)}
            />

            <Select
              id="sections"
              value={sectionId}
              onChange={(event) => setSectionId(event.target.value)}
            >
              <option value="">-----අංශය-----</option>
              {sections.map((section) => {
                return (
                  <option value={section.sectionId} key={section.sectionId}>
                    {section.sectionName}
                  </option>
                );
              })}
            </Select>
            <Button
              className="uppercase h-12"
              color="blue"
              onClick={fetchAllEmployees}
            >
              {" "}
              <FaSearch className="mr-2 h-5 w-5" />
              Search
            </Button>
          </fieldset>
        </div>
        {/* Search option ends here */}

        {/* Employees card grid starts here */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
          {employeeData &&
            employeeData.map((employee) => {
              return (
                <div
                  onClick={() => {
                    navigate(currentUser.some(role => [roles.hrAdmin, roles.chairman, roles.secretary].includes(role)) && "/HR/employeeProfile", { state: employee });
                  }}
                  key={employee[0]}
                >
                  <HREmployeeCard
                    nicNo={employee[0]}
                    name={employee[1]}
                    designation={employee[3]}
                    contact={employee[2]}
                    // key={employee.nicNo}
                  />
                </div>
              );
            })}
        </div>
        {/* Employees card grid ends here */}
      </div>
    </main>
  );
}

export default HRSearchEmployees;

import { useState, useEffect } from "react";
import HREmployeeCard from "../components/hr-employee-card";
import HRCollapseBar from "../components/hr-collapse-bar";
import EmployeeService from "../services/add-new-employee-service";
import LeaveCollapseBar from "../leave/components/hr-leave-collapse-bar";
import userRoles from "../../data/user-roles";

function HREmployeeBirthdayToday() {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;

  const [employeeData, setEmployeeData] = useState([]);
  const getEmployeeBirthdayToday = async () => {
    try {
      const response = await EmployeeService.findEmployeeBirthdayToday();
      setEmployeeData(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    getEmployeeBirthdayToday();
  }, []);

  return (
    <main>
      {/* Collapse bar starts here */}
      {currentUser.some(role => [roles.hrAdmin, roles.chairman, roles.secretary].includes(role)) && <HRCollapseBar />}
      {currentUser.includes(roles.leaveAdmin) && <LeaveCollapseBar />}
      {/* Collapse bae ends here */}

      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase mx-5">
          Birthday Today
        </h3>

        {/* Employees card grid starts here */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
          {employeeData && employeeData.length > 0 ? (
            employeeData.map((employee) => (
              <div key={employee[0]}>
                <HREmployeeCard
                  nicNo={employee[0]}
                  name={employee[1]}
                  designation={employee[3]}
                  contact={employee[2]}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-screen h-screen">
              <div className="text-center text-lg text-gray-500 font-semibold border-2 border-gray-200 p-4 rounded-lg">
                No Birthdays Today
              </div>
            </div>
          )}
        </div>
        {/* Employees card grid ends here */}
      </div>
    </main>
  );
}

export default HREmployeeBirthdayToday;

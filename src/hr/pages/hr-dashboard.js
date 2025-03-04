import { useState,useEffect } from "react";
import HRCollapseBar from "../components/hr-collapse-bar";
import HRDashboardCard from "../components/hr-dashboard-card";
import Tab from "../../components/tabs";
import HRLeaveTracker from "../components/hr-employee-leave-tracker";
import TimeLine from "../../components/time-line";
import { FaCalendarCheck, FaUmbrellaBeach, FaCheckDouble,FaBell} from "react-icons/fa";
import HRAttendanceTracker from "../components/hr-employee-attendance-sheet";
import HRLeaveRegister from "../components/hr-employee-leave-register";
import EmployeeService from "../services/add-new-employee-service";
import LeaveApplicationService from "../leave/services/leave-application-service";
import userRoles from "../../data/user-roles";
import LeaveCollapseBar from "../leave/components/hr-leave-collapse-bar";

function HRDashboard() {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).roles
    : null;
  const roles = userRoles;
  const nicNo = JSON.parse(localStorage.getItem("nicNo"));

  const [employeeCount, setEmployeeCount] = useState(0);
  const [onLeaveTodayApplicationsCount, setOnLeaveTodayApplicationsCount] = useState(0);
  const [pendingLeaveRequestsCount, setPendingLeaveRequestsCount] = useState(0);
  const [birthdayTodayCount, setBirthdayTodayCount] = useState(0);

  useEffect(() => {
      EmployeeService.getCount()
      .then((response) => {
        setEmployeeCount(response.data);
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
      const getOnLeaveTodayApplicationsCount = async () => {
        try {
          const response = await LeaveApplicationService.getOnLeaveTodayApplicationsCount();
          setOnLeaveTodayApplicationsCount(response.data);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
          }
        }
      }

      const getPendingLeaveRequests = async () => {
        try {
          const response = await LeaveApplicationService.getLeaveRequestsCount(nicNo);
          setPendingLeaveRequestsCount(response.data);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
          }
        }
      }

      const getBirthdayTodayEmployeeCount = async () => {
        try {
          const response = await LeaveApplicationService.getBirthdayTodayEmployeeCount();
          setBirthdayTodayCount(response.data);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
          }
        }
      }

      getOnLeaveTodayApplicationsCount();
      getPendingLeaveRequests();
      getBirthdayTodayEmployeeCount();
    }, [nicNo]);


  const cardData = [
    {
      id: 1,
      title: "Total Employees",
      count: employeeCount,
      image: "/Images/total-employees.jpeg",
      url: "/HR/allEmployees"
    },
    {
      id: 2,
      title: "On Leave Today",
      count: onLeaveTodayApplicationsCount,
      image: "/Images/on-leave.webp",
      url: "/HR/Leave/onLeaveToday"
    },
    {
      id: 3,
      title: "Leave requests",
      count: pendingLeaveRequestsCount,
      image: "/Images/leave-request.jpg",
      url: "/HR/leave/pendingLeaveRequests"
    },
    {
      id: 4,
      title: "Birthday Today",
      count: birthdayTodayCount,
      image: "/Images/employee-birthday.jpg",
      url: "/HR/Leave/birthdayToday"
    },
  ];

  const tabData = [
    {
      id: 1 ,
      active: true,
      title: "Track Leaves",
      icon: FaCheckDouble,
      content: <HRLeaveTracker/> 
    },
    {
      id: 2,
      active: true,
      title: "Employee Attendance ",
      icon: FaCalendarCheck,
      content: <HRAttendanceTracker/>
    },
    {
      id: 3,
      active: true,
      title: "Employee Leaves",
      icon: FaUmbrellaBeach,
      content: <HRLeaveRegister/>
    },
    {
        id: 4,
        active: true,
        title: "Notifications",
        icon: FaBell,
        content: <TimeLine/>
      }
   ];

  return (
    <main>
      {currentUser.some((role) =>
        [roles.hrAdmin, roles.chairman, roles.secretary].includes(role)
      ) && <HRCollapseBar />}
      {currentUser.includes(roles.leaveAdmin) && <LeaveCollapseBar />}
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          {currentUser.includes(roles.user) ? "Dashboard" : "Administration Section"}
        </h3>
        {/* Dashboard cards starts here */}
        <div className="grid  lg:grid-cols-4 md:grid-cols-2 gap-10 my-5">
         
          {cardData.map((data) => (
            <HRDashboardCard
              key={data.id}
              title={data.title}
              count={data.count}
              image={data.image}
              url={data.url}
            />
          ))}

        
        </div>

        <div className="grid grid-cols-1">
            {!currentUser.includes(roles.user) && (<Tab para={tabData}/>)}
        </div>
      </div>
    </main>
  );
}

export default HRDashboard;

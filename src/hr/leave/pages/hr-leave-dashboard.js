import LeaveCollapseBar from "../components/hr-leave-collapse-bar";
import HRDashboardCard from "../../components/hr-dashboard-card";
import Tab from "../../../components/tabs";
import HRLeaveTracker from "../../components/hr-employee-leave-tracker";
import TimeLine from "../../../components/time-line";
import HRAttendanceTracker from "../../components/hr-employee-attendance-sheet";
import HRLeaveRegister from "../../components/hr-employee-leave-register";

import { FaCalendarCheck, FaUmbrellaBeach, FaCheckDouble,FaBell} from "react-icons/fa";

function HRLeaveDashboard() {
  const cardData = [
    {
      id: 1,
      title: "Employees Today",
      count: 100,
      image: "/Images/total-employees.jpeg",
      url: "/HR/employeesAttendance"
    },
    {
      id: 2,
      title: "On Leave Today",
      count: 12,
      image: "/Images/on-leave.webp",
      url: "/HR/onLeaveToday"
    },
    {
      id: 3,
      title: "Leave requests",
      count: 5,
      image: "/Images/leave-request.jpg",
      url: "/HR/Leave/employeeAttendanceSheet"
    },
    {
      id: 4,
      title: "Birthday Today",
      count: 12,
      image: "/Images/employee-birthday.jpg",
      url: ""
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
      <LeaveCollapseBar />
      <div className="flex flex-col gap-2 m-5">
        <h3 className="text-center text-lg text-slate-500 font-semibold border-b-2 border-b-slate-200 uppercase">
          Leave Section
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
            <Tab para={tabData}/>
        </div>
      </div>
    </main>
  );
}

export default HRLeaveDashboard;
